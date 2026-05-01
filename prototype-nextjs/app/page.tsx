import { getGroupSlugs, getGroupMeta } from '@/lib/content'
import GroupCard from '@/components/GroupCard'

export default function HomePage() {
  const slugs = getGroupSlugs()
  const groups = slugs.map((slug) => ({ slug, meta: getGroupMeta(slug) }))

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="mb-14">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#58a6ff] bg-[#0d2d6b] border border-[#1f5eb8] px-2 py-0.5 rounded">
            ADHD-Friendly
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#3fb950] bg-[#0d2b1e] border border-[#196c2e] px-2 py-0.5 rounded">
            Threat Intelligence
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#e6edf3] mb-4 leading-tight">
          APT Research{' '}
          <span className="text-[#58a6ff]">Platform</span>
        </h1>
        <p className="text-lg text-[#8b949e] max-w-2xl mb-6 leading-relaxed">
          Structured, readable threat intelligence on Advanced Persistent Threat groups. Designed
          for focus — clear visual hierarchy, colour-coded categories, and collapsible sections to
          reduce cognitive load.
        </p>

        <div className="flex flex-wrap gap-2 text-sm">
          {[
            { icon: '🏗️', label: 'Structured navigation' },
            { icon: '🎨', label: 'Colour-coded categories' },
            { icon: '📦', label: 'Collapsible sections' },
            { icon: '🔍', label: 'Source-linked content' },
            { icon: '🧠', label: 'MITRE ATT&CK mapping' },
          ].map(({ icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 bg-[#161b22] border border-[#30363d] px-3 py-1 rounded-full text-[#8b949e]"
            >
              <span>{icon}</span>
              {label}
            </span>
          ))}
        </div>
      </section>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { value: groups.length.toString(), label: 'APT Groups' },
          { value: '20+', label: 'Content Files' },
          { value: '3', label: 'Content Categories' },
          { value: '100%', label: 'Open Source' },
        ].map(({ value, label }) => (
          <div
            key={label}
            className="bg-[#161b22] border border-[#30363d] rounded-lg px-4 py-3 text-center"
          >
            <p className="text-2xl font-bold text-[#58a6ff]">{value}</p>
            <p className="text-xs text-[#8b949e] uppercase tracking-wide mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* APT Groups grid */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-[#e6edf3]">APT Groups</h2>
          <span className="text-sm text-[#8b949e]">
            {groups.length} group{groups.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {groups.map(({ slug, meta }) => (
            <GroupCard key={slug} slug={slug} meta={meta} />
          ))}
        </div>
      </section>
    </div>
  )
}
