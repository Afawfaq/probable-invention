import { getGroupNav, getGroupMeta, getGroupSlugs } from '@/lib/content'
import Sidebar from '@/components/Sidebar'
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

export default async function GroupLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const nav = getGroupNav(slug)
  const meta = getGroupMeta(slug)

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 flex gap-6 items-start">
      <Sidebar nav={nav} groupName={meta.title as string} />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  )
}
