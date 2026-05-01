import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.resolve(process.cwd(), '..', 'content')
const APT_GROUPS_DIR = path.join(CONTENT_DIR, 'apt-groups')

export interface GroupMeta {
  title: string
  slug: string
  attribution?: string
  nation_state?: string
  active_since?: string
  discovered?: number
  discovered_by?: string
  mitre_group_id?: string
  tags?: string[]
  source_code_available?: boolean
  source_code_notes?: string
  aliases?: string[]
  [key: string]: unknown
}

export interface NavItem {
  label: string
  href: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export function getGroupSlugs(): string[] {
  if (!fs.existsSync(APT_GROUPS_DIR)) return []
  return fs.readdirSync(APT_GROUPS_DIR).filter((f) =>
    fs.statSync(path.join(APT_GROUPS_DIR, f)).isDirectory()
  )
}

export function getGroupMeta(slug: string): GroupMeta {
  const filePath = path.join(APT_GROUPS_DIR, slug, 'overview.md')
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data } = matter(fileContent)
  return data as GroupMeta
}

export function getGroupContent(
  slug: string,
  section?: string,
  item?: string
): { frontmatter: Record<string, unknown>; content: string } {
  let filePath: string

  if (section && item) {
    if (section === 'root') {
      filePath = path.join(APT_GROUPS_DIR, slug, `${item}.md`)
    } else {
      filePath = path.join(APT_GROUPS_DIR, slug, section, `${item}.md`)
    }
  } else {
    filePath = path.join(APT_GROUPS_DIR, slug, 'overview.md')
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  return { frontmatter: data as Record<string, unknown>, content }
}

function getFileTitle(filePath: string, fallback: string): string {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(raw)
    return (data.title as string) || fallback
  } catch {
    return fallback
  }
}

function slugToLabel(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export function getGroupNav(slug: string): NavSection[] {
  const groupDir = path.join(APT_GROUPS_DIR, slug)
  const nav: NavSection[] = []

  // Overview section — root-level pages
  const overviewItems: NavItem[] = [
    { label: 'Overview', href: `/groups/${slug}` },
  ]
  for (const item of ['timeline', 'references']) {
    const fp = path.join(groupDir, `${item}.md`)
    if (fs.existsSync(fp)) {
      overviewItems.push({ label: slugToLabel(item), href: `/groups/${slug}/root/${item}` })
    }
  }
  nav.push({ title: 'Overview', items: overviewItems })

  // Malware Arsenal
  const malwareDir = path.join(groupDir, 'malware')
  if (fs.existsSync(malwareDir)) {
    const files = fs.readdirSync(malwareDir).filter((f) => f.endsWith('.md'))
    nav.push({
      title: 'Malware Arsenal',
      items: files.map((f) => {
        const item = f.replace('.md', '')
        return {
          label: getFileTitle(path.join(malwareDir, f), item.toUpperCase()),
          href: `/groups/${slug}/malware/${item}`,
        }
      }),
    })
  }

  // ShadowBrokers Dump
  const dumpDir = path.join(groupDir, 'shadowbrokers-dump')
  if (fs.existsSync(dumpDir)) {
    const files = fs.readdirSync(dumpDir).filter((f) => f.endsWith('.md'))
    nav.push({
      title: 'ShadowBrokers Dump',
      items: files.map((f) => {
        const item = f.replace('.md', '')
        return {
          label: getFileTitle(path.join(dumpDir, f), slugToLabel(item)),
          href: `/groups/${slug}/shadowbrokers-dump/${item}`,
        }
      }),
    })
  }

  // TTPs
  const ttpsDir = path.join(groupDir, 'ttps')
  if (fs.existsSync(ttpsDir)) {
    const files = fs.readdirSync(ttpsDir).filter((f) => f.endsWith('.md'))
    nav.push({
      title: 'TTPs',
      items: files.map((f) => {
        const item = f.replace('.md', '')
        return {
          label: getFileTitle(path.join(ttpsDir, f), slugToLabel(item)),
          href: `/groups/${slug}/ttps/${item}`,
        }
      }),
    })
  }

  return nav
}

export function getGroupDetailParams(): { slug: string; section: string; item: string }[] {
  const slugs = getGroupSlugs()
  const params: { slug: string; section: string; item: string }[] = []

  for (const slug of slugs) {
    const groupDir = path.join(APT_GROUPS_DIR, slug)

    // Root-level pages
    for (const item of ['timeline', 'references']) {
      if (fs.existsSync(path.join(groupDir, `${item}.md`))) {
        params.push({ slug, section: 'root', item })
      }
    }

    // Sub-directory pages
    for (const section of ['malware', 'shadowbrokers-dump', 'ttps']) {
      const sectionDir = path.join(groupDir, section)
      if (fs.existsSync(sectionDir)) {
        fs.readdirSync(sectionDir)
          .filter((f) => f.endsWith('.md'))
          .forEach((f) => params.push({ slug, section, item: f.replace('.md', '') }))
      }
    }
  }

  return params
}
