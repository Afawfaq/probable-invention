import { getGroupContent, getGroupDetailParams } from '@/lib/content'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import Badge from '@/components/Badge'
import type { Metadata } from 'next'

interface PageParams {
  slug: string
  section: string
  item: string
}

// Typed subset of frontmatter fields used in this page
interface DetailMeta {
  title?: string
  platform?: string
  category?: string
  source_available?: boolean
  source_notes?: string
  tags?: string[]
  mitre_techniques?: string[]
  [key: string]: unknown
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const { slug, section, item } = await params
  try {
    const { frontmatter } = getGroupContent(slug, section, item)
    const meta = frontmatter as DetailMeta
    return { title: meta.title || item }
  } catch {
    return { title: item }
  }
}

export async function generateStaticParams() {
  return getGroupDetailParams()
}

function sectionLabel(section: string): string {
  const labels: Record<string, string> = {
    root: 'Overview',
    malware: 'Malware Arsenal',
    'shadowbrokers-dump': 'ShadowBrokers Dump',
    ttps: 'TTPs',
  }
  return labels[section] ?? section
}

type BadgeVariant = 'default' | 'danger' | 'warning' | 'nation' | 'success' | 'tag'

function categoryBadgeVariant(section: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    malware: 'danger',
    'shadowbrokers-dump': 'warning',
    ttps: 'nation',
    root: 'default',
  }
  return map[section] ?? 'default'
}

export default async function DetailPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { slug, section, item } = await params
  const { frontmatter, content } = getGroupContent(slug, section, item)
  const meta = frontmatter as DetailMeta

  return (
    <div>
      {/* Breadcrumb + category badge */}
      <div className="flex items-center gap-2 mb-5 text-sm text-[#8b949e]">
        <Badge variant={categoryBadgeVariant(section)}>{sectionLabel(section)}</Badge>
        <span className="text-[#484f58]">/</span>
        <span className="text-[#e6edf3]">{meta.title || item}</span>
      </div>

      {/* Metadata card for malware items */}
      {section === 'malware' && (
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 mb-8">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <h1 className="text-2xl font-bold text-[#e6edf3]">{meta.title || item}</h1>
            <Badge variant="danger">🦠 Malware</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {meta.platform && (
              <div>
                <p className="text-[#8b949e] uppercase tracking-wide mb-0.5">Platform</p>
                <p className="text-[#e6edf3]">{meta.platform}</p>
              </div>
            )}
            {meta.category && (
              <div>
                <p className="text-[#8b949e] uppercase tracking-wide mb-0.5">Category</p>
                <p className="text-[#e6edf3] capitalize">{meta.category}</p>
              </div>
            )}
            {typeof meta.source_available === 'boolean' && (
              <div>
                <p className="text-[#8b949e] uppercase tracking-wide mb-0.5">Source Available</p>
                <p className={meta.source_available ? 'text-[#3fb950]' : 'text-[#f85149]'}>
                  {meta.source_available ? '✓ Yes' : '✗ No'}
                </p>
              </div>
            )}
          </div>

          {meta.mitre_techniques && meta.mitre_techniques.length > 0 && (
            <div className="mt-3 pt-3 border-t border-[#30363d]">
              <p className="text-[#8b949e] text-xs uppercase tracking-wide mb-1.5">
                MITRE Techniques
              </p>
              <div className="flex flex-wrap gap-1.5">
                {meta.mitre_techniques.map((t) => (
                  <Badge key={t} variant="warning">
                    {t.split(/\s+/)[0]}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {meta.tags && meta.tags.length > 0 && (
            <div className="mt-3 pt-3 border-t border-[#30363d]">
              <div className="flex flex-wrap gap-1.5">
                {meta.tags.map((tag) => (
                  <Badge key={tag} variant="tag">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Metadata card for TTPs */}
      {section === 'ttps' && (
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 mb-8">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <h1 className="text-2xl font-bold text-[#e6edf3]">{meta.title || item}</h1>
            <Badge variant="nation">⚔️ TTP</Badge>
          </div>

          {meta.mitre_techniques && meta.mitre_techniques.length > 0 && (
            <div className="mt-2">
              <p className="text-[#8b949e] text-xs uppercase tracking-wide mb-1.5">
                MITRE Techniques
              </p>
              <div className="flex flex-wrap gap-1.5">
                {meta.mitre_techniques.map((t) => (
                  <Badge key={t} variant="warning">
                    {t.split(/\s+/)[0]}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {meta.tags && meta.tags.length > 0 && (
            <div className="mt-3 pt-3 border-t border-[#30363d]">
              <div className="flex flex-wrap gap-1.5">
                {meta.tags.map((tag) => (
                  <Badge key={tag} variant="tag">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ShadowBrokers dump metadata */}
      {section === 'shadowbrokers-dump' && (
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 mb-8">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
            <h1 className="text-2xl font-bold text-[#e6edf3]">{meta.title || item}</h1>
            <Badge variant="warning">⚠️ ShadowBrokers Dump</Badge>
          </div>
          {meta.tags && meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {meta.tags.map((tag) => (
                <Badge key={tag} variant="tag">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Root-level pages (timeline, references) — minimal header */}
      {section === 'root' && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#e6edf3]">{meta.title || item}</h1>
        </div>
      )}

      {/* Markdown content */}
      <MarkdownRenderer content={content} />
    </div>
  )
}
