import { getGroupContent, getGroupMeta, getGroupSlugs } from '@/lib/content'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import Badge from '@/components/Badge'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const meta = getGroupMeta(slug)
  return { title: meta.title }
}

export async function generateStaticParams() {
  return getGroupSlugs().map((slug) => ({ slug }))
}

export default async function GroupOverviewPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // Use typed GroupMeta for the metadata card, content only for markdown
  const meta = getGroupMeta(slug)
  const { content } = getGroupContent(slug)

  return (
    <div>
      {/* Page header with metadata */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 mb-8">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-[#e6edf3] mb-1">{meta.title || slug}</h1>
            {meta.attribution && (
              <p className="text-sm text-[#8b949e]">{meta.attribution}</p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {meta.nation_state && (
              <Badge variant="nation">🏴 {meta.nation_state}</Badge>
            )}
            {meta.source_code_available && (
              <Badge variant="success">⚡ Source code available</Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
          {meta.active_since && (
            <div>
              <p className="text-[#8b949e] uppercase tracking-wide mb-0.5">Active Since</p>
              <p className="text-[#58a6ff] font-semibold">{meta.active_since}</p>
            </div>
          )}
          {meta.discovered && (
            <div>
              <p className="text-[#8b949e] uppercase tracking-wide mb-0.5">Discovered</p>
              <p className="text-[#e6edf3] font-semibold">{meta.discovered}</p>
            </div>
          )}
          {meta.discovered_by && (
            <div>
              <p className="text-[#8b949e] uppercase tracking-wide mb-0.5">Discovered By</p>
              <p className="text-[#e6edf3]">{meta.discovered_by}</p>
            </div>
          )}
          {meta.mitre_group_id && (
            <div>
              <p className="text-[#8b949e] uppercase tracking-wide mb-0.5">MITRE ID</p>
              <p className="font-mono text-[#d29922]">{meta.mitre_group_id}</p>
            </div>
          )}
        </div>

        {meta.tags && meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {meta.tags.map((tag) => (
              <Badge key={tag} variant="tag">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Markdown content */}
      <MarkdownRenderer content={content} />
    </div>
  )
}
