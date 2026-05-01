import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type NodeType = 'group' | 'malware' | 'ttp' | 'external'
export type EdgeType = 'uses' | 'employs' | 'related' | 'shared_technique' | 'cross_group'

export interface GraphNode {
  id: string
  label: string
  type: NodeType
  groupSlug?: string
  href?: string
}

export interface GraphEdge {
  id: string
  source: string
  target: string
  label: string
  type: EdgeType
}

export interface GraphData {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

function shortLabel(title: string): string {
  // Strip "TTP: " prefix
  const stripped = title.replace(/^TTP:\s+/i, '')
  // Strip " — description" suffix (em-dash)
  const dashIdx = stripped.indexOf(' \u2014 ')
  return dashIdx > 0 ? stripped.slice(0, dashIdx) : stripped
}

export function buildGraphData(): GraphData {
  const nodes: GraphNode[] = []
  const edges: GraphEdge[] = []
  const seenNodes = new Set<string>()

  function addNode(node: GraphNode): void {
    if (!seenNodes.has(node.id)) {
      nodes.push(node)
      seenNodes.add(node.id)
    }
  }

  const APT_GROUPS_DIR = path.resolve(process.cwd(), '..', 'content', 'apt-groups')
  const slugs = fs
    .readdirSync(APT_GROUPS_DIR)
    .filter((f) => fs.statSync(path.join(APT_GROUPS_DIR, f)).isDirectory())

  // Track base MITRE technique IDs per group (for shared-technique cross-edges)
  const groupTechniques: Record<string, Set<string>> = {}

  for (const slug of slugs) {
    const groupDir = path.join(APT_GROUPS_DIR, slug)
    const { data: meta } = matter(fs.readFileSync(path.join(groupDir, 'overview.md'), 'utf-8'))

    addNode({
      id: slug,
      label: (meta.title as string) || slug,
      type: 'group',
      href: `/groups/${slug}`,
    })

    groupTechniques[slug] = new Set<string>()

    // ---- Malware ----
    const malwareDir = path.join(groupDir, 'malware')
    if (fs.existsSync(malwareDir)) {
      for (const file of fs.readdirSync(malwareDir).filter((f) => f.endsWith('.md'))) {
        const item = file.replace('.md', '')
        const { data: mal } = matter(fs.readFileSync(path.join(malwareDir, file), 'utf-8'))

        const nodeId = `${slug}__${item}`
        addNode({
          id: nodeId,
          label: shortLabel((mal.title as string) || item),
          type: 'malware',
          groupSlug: slug,
          href: `/groups/${slug}/malware/${item}`,
        })

        edges.push({
          id: `${slug}--uses--${item}`,
          source: slug,
          target: nodeId,
          label: 'uses',
          type: 'uses',
        })

        // Collect base technique IDs for shared-technique analysis
        if (Array.isArray(mal.mitre_techniques)) {
          for (const t of mal.mitre_techniques as string[]) {
            const base = (t.split(/\s+/)[0] ?? t).split('.')[0]
            groupTechniques[slug].add(base)
          }
        }

        // External relationships: Stuxnet shared zero-days
        if (Array.isArray(mal.related_to)) {
          for (const rel of mal.related_to as string[]) {
            if (rel.toLowerCase().includes('stuxnet')) {
              addNode({ id: 'stuxnet', label: 'Stuxnet', type: 'external' })
              const edgeId = `${nodeId}--related--stuxnet`
              if (!edges.find((e) => e.id === edgeId)) {
                edges.push({
                  id: edgeId,
                  source: nodeId,
                  target: 'stuxnet',
                  label: 'shares zero-days',
                  type: 'related',
                })
              }
            }
          }
        }
      }
    }

    // ---- TTPs ----
    const ttpsDir = path.join(groupDir, 'ttps')
    if (fs.existsSync(ttpsDir)) {
      for (const file of fs.readdirSync(ttpsDir).filter((f) => f.endsWith('.md'))) {
        const item = file.replace('.md', '')
        const { data: ttp } = matter(fs.readFileSync(path.join(ttpsDir, file), 'utf-8'))

        const nodeId = `${slug}__ttp__${item}`
        addNode({
          id: nodeId,
          label: shortLabel((ttp.title as string) || item),
          type: 'ttp',
          groupSlug: slug,
          href: `/groups/${slug}/ttps/${item}`,
        })

        edges.push({
          id: `${slug}--employs--${item}`,
          source: slug,
          target: nodeId,
          label: 'employs',
          type: 'employs',
        })

        // Single mitre_technique field on TTP files
        if (typeof ttp.mitre_technique === 'string') {
          const base = (ttp.mitre_technique as string).split('.')[0]
          groupTechniques[slug].add(base)
        }
      }
    }
  }

  // ---- Cross-group shared MITRE technique edges ----
  // Build a map of base technique → groups that use it
  const techToGroups: Record<string, string[]> = {}
  for (const [groupSlug, techs] of Object.entries(groupTechniques)) {
    for (const base of techs) {
      if (!techToGroups[base]) techToGroups[base] = []
      if (!techToGroups[base].includes(groupSlug)) techToGroups[base].push(groupSlug)
    }
  }

  // For each pair of groups, collect their shared techniques
  const pairSharedTechs: Record<string, string[]> = {}
  for (const [tech, groups] of Object.entries(techToGroups)) {
    if (groups.length >= 2) {
      for (let i = 0; i < groups.length; i++) {
        for (let j = i + 1; j < groups.length; j++) {
          const key = [groups[i], groups[j]].sort().join('|||')
          if (!pairSharedTechs[key]) pairSharedTechs[key] = []
          pairSharedTechs[key].push(tech)
        }
      }
    }
  }

  for (const [key, techs] of Object.entries(pairSharedTechs)) {
    const [g1, g2] = key.split('|||')
    edges.push({
      id: `${g1}--shared_technique--${g2}`,
      source: g1,
      target: g2,
      label: `${techs.length} shared techniques`,
      type: 'shared_technique',
    })
  }

  // ---- Turla hijacked OilRig C2 ----
  addNode({ id: 'oilrig', label: 'OilRig (hijacked by Turla)', type: 'external' })
  edges.push({
    id: 'turla--cross_group--oilrig',
    source: 'turla',
    target: 'oilrig',
    label: 'hijacked C2',
    type: 'cross_group',
  })

  return { nodes, edges }
}
