import Link from 'next/link'
import Badge from './Badge'
import type { GroupMeta } from '@/lib/content'

interface GroupCardProps {
  meta: GroupMeta
  slug: string
}

export default function GroupCard({ meta, slug }: GroupCardProps) {
  return (
    <Link href={`/groups/${slug}`} className="block group">
      <div className="h-full bg-[#161b22] border border-[#30363d] rounded-lg p-6 transition-all duration-200 group-hover:border-[#58a6ff] group-hover:shadow-lg group-hover:shadow-[#58a6ff]/10">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h2 className="text-xl font-bold text-[#e6edf3] group-hover:text-[#58a6ff] transition-colors">
            {meta.title}
          </h2>
          {meta.nation_state && (
            <Badge variant="nation" className="shrink-0">
              🏴 {meta.nation_state}
            </Badge>
          )}
        </div>

        {/* Attribution */}
        {meta.attribution && (
          <p className="text-sm text-[#8b949e] mb-4 leading-relaxed">{meta.attribution}</p>
        )}

        {/* Meta info row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4 text-xs">
          {meta.active_since && (
            <span className="text-[#8b949e]">
              Active since:{' '}
              <span className="text-[#58a6ff] font-semibold">{meta.active_since}</span>
            </span>
          )}
          {meta.discovered && (
            <span className="text-[#8b949e]">
              Discovered:{' '}
              <span className="text-[#e6edf3] font-semibold">{meta.discovered}</span>
            </span>
          )}
          {meta.discovered_by && (
            <span className="text-[#8b949e]">
              By: <span className="text-[#e6edf3]">{meta.discovered_by}</span>
            </span>
          )}
          {meta.mitre_group_id && (
            <span className="text-[#8b949e]">
              MITRE:{' '}
              <span className="font-mono text-[#d29922]">{meta.mitre_group_id}</span>
            </span>
          )}
        </div>

        {/* Tags */}
        {meta.tags && meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {meta.tags.slice(0, 7).map((tag) => (
              <Badge key={tag} variant="tag">
                #{tag}
              </Badge>
            ))}
            {meta.tags.length > 7 && (
              <Badge variant="tag">+{meta.tags.length - 7} more</Badge>
            )}
          </div>
        )}

        {/* Source code badge */}
        {meta.source_code_available && (
          <div className="pt-3 border-t border-[#30363d]">
            <Badge variant="success">⚡ Source code available</Badge>
          </div>
        )}
      </div>
    </Link>
  )
}
