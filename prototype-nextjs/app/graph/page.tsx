import { buildGraphData } from '@/lib/graph'
import GraphClient from '@/components/GraphClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Relationship Graph' }

const LEGEND = [
  { color: '#1f6feb', border: '#388bfd', label: 'APT Group', style: 'solid' },
  { color: '#6e1c1c', border: '#da3633', label: 'Malware / Implant', style: 'solid' },
  { color: '#2d2000', border: '#9e6a03', label: 'TTP', style: 'solid' },
  { color: '#161b22', border: '#484f58', label: 'External entity', style: 'dashed' },
] as const

const EDGE_LEGEND = [
  { color: '#3fb950', label: 'uses (group → malware)', style: 'solid' },
  { color: '#58a6ff', label: 'employs (group → TTP)', style: 'dashed' },
  { color: '#d29922', label: 'shared MITRE techniques', style: 'dotted' },
  { color: '#f0883e', label: 'related / shares zero-days', style: 'solid' },
  { color: '#bc8cff', label: 'cross-group (hijacked C2)', style: 'solid' },
] as const

export default function GraphPage() {
  const data = buildGraphData()

  const nodeCount = data.nodes.length
  const edgeCount = data.edges.length
  const groupCount = data.nodes.filter((n) => n.type === 'group').length
  const malwareCount = data.nodes.filter((n) => n.type === 'malware').length
  const ttpCount = data.nodes.filter((n) => n.type === 'ttp').length

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#e6edf3] mb-1">Relationship Graph</h1>
        <p className="text-sm text-[#8b949e]">
          Visual map of APT groups, their tools, TTPs, and cross-group connections. Click any node
          to navigate to its page.
        </p>
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap gap-3 mb-5 text-xs">
        {[
          { value: groupCount, label: 'Groups', color: '#388bfd' },
          { value: malwareCount, label: 'Malware', color: '#da3633' },
          { value: ttpCount, label: 'TTPs', color: '#9e6a03' },
          { value: nodeCount, label: 'Total nodes', color: '#8b949e' },
          { value: edgeCount, label: 'Edges', color: '#8b949e' },
        ].map(({ value, label, color }) => (
          <div
            key={label}
            className="bg-[#161b22] border border-[#30363d] rounded px-3 py-1.5 flex items-center gap-1.5"
          >
            <span className="font-bold" style={{ color }}>
              {value}
            </span>
            <span className="text-[#8b949e]">{label}</span>
          </div>
        ))}
      </div>

      {/* Graph canvas */}
      <div className="mb-6">
        <GraphClient data={data} />
        <p className="text-xs text-[#484f58] mt-2 text-center">
          Scroll to zoom · Drag to pan · Click a node to navigate
        </p>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Node types */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <p className="text-xs font-bold text-[#8b949e] uppercase tracking-wide mb-3">
            Node types
          </p>
          <div className="space-y-2">
            {LEGEND.map(({ color, border, label, style }) => (
              <div key={label} className="flex items-center gap-2.5">
                <span
                  className="inline-block w-8 h-5 rounded flex-shrink-0"
                  style={{
                    backgroundColor: color,
                    border: `${style === 'dashed' ? '2px dashed' : '1px solid'} ${border}`,
                  }}
                />
                <span className="text-xs text-[#cdd9e5]">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Edge types */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <p className="text-xs font-bold text-[#8b949e] uppercase tracking-wide mb-3">
            Edge types
          </p>
          <div className="space-y-2">
            {EDGE_LEGEND.map(({ color, label, style }) => (
              <div key={label} className="flex items-center gap-2.5">
                <span
                  className="inline-block w-8 flex-shrink-0"
                  style={{
                    height: '2px',
                    backgroundColor: color,
                    borderTop:
                      style === 'dashed'
                        ? `2px dashed ${color}`
                        : style === 'dotted'
                          ? `2px dotted ${color}`
                          : 'none',
                    backgroundImage:
                      style === 'dashed' || style === 'dotted' ? 'none' : undefined,
                  }}
                />
                <span className="text-xs text-[#cdd9e5]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
