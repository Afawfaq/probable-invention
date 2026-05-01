import { getGroupContent, getGroupSlugs } from '@/lib/content'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { frontmatter } = getGroupContent(slug, undefined, 'references')
  return { title: (frontmatter.title as string) || 'References' }
}

export async function generateStaticParams() {
  return getGroupSlugs().map((slug) => ({ slug }))
}

export default async function ReferencesPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { frontmatter, content } = getGroupContent(slug, undefined, 'references')

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#e6edf3]">
          {(frontmatter.title as string) || 'References'}
        </h1>
      </div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
