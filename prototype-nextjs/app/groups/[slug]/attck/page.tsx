import { getGroupContent, getGroupSlugs } from '@/lib/content'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import Badge from '@/components/Badge'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { frontmatter } = getGroupContent(slug, undefined, 'attck')
  return { title: (frontmatter.title as string) || 'ATT&CK Matrix' }
}

export async function generateStaticParams() {
  return getGroupSlugs().map((slug) => ({ slug }))
}

export default async function AttckPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { frontmatter, content } = getGroupContent(slug, undefined, 'attck')

  const mitreId = frontmatter.mitre_group_id as string | undefined
  const mitreUrl = frontmatter.mitre_group_url as string | undefined

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#e6edf3]">
            {(frontmatter.title as string) || 'ATT&CK Matrix'}
          </h1>
          {mitreId && (
            <p className="text-sm text-[#8b949e] mt-1">
              MITRE ATT&CK Group{' '}
              {mitreUrl ? (
                <a
                  href={mitreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#58a6ff] hover:underline font-mono"
                >
                  {mitreId}
                </a>
              ) : (
                <span className="font-mono text-[#d29922]">{mitreId}</span>
              )}
            </p>
          )}
        </div>
        <Badge variant="warning">⚔️ ATT&CK Matrix</Badge>
      </div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
