import { getGroupContent, getGroupSlugs } from '@/lib/content'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { frontmatter } = getGroupContent(slug, undefined, 'timeline')
  return { title: (frontmatter.title as string) || 'Timeline' }
}

export async function generateStaticParams() {
  return getGroupSlugs().map((slug) => ({ slug }))
}

export default async function TimelinePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { frontmatter, content } = getGroupContent(slug, undefined, 'timeline')

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#e6edf3]">
          {(frontmatter.title as string) || 'Timeline'}
        </h1>
      </div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
