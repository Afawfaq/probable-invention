'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import cytoscape from 'cytoscape'
import type { GraphData } from '@/lib/graph'

interface Props {
  data: GraphData
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NODE_STYLES: any[] = [
  {
    selector: 'node[type="group"]',
    style: {
      'background-color': '#1f6feb',
      'label': 'data(label)',
      'color': '#e6edf3',
      'text-valign': 'center',
      'text-halign': 'center',
      'font-size': '13px',
      'font-weight': 'bold',
      'width': '130px',
      'height': '54px',
      'shape': 'roundrectangle',
      'text-wrap': 'wrap',
      'text-max-width': '118px',
      'border-width': '2px',
      'border-color': '#388bfd',
    },
  },
  {
    selector: 'node[type="malware"]',
    style: {
      'background-color': '#6e1c1c',
      'label': 'data(label)',
      'color': '#ffa198',
      'text-valign': 'center',
      'text-halign': 'center',
      'font-size': '11px',
      'width': '108px',
      'height': '42px',
      'shape': 'roundrectangle',
      'text-wrap': 'wrap',
      'text-max-width': '98px',
      'border-width': '1px',
      'border-color': '#da3633',
    },
  },
  {
    selector: 'node[type="ttp"]',
    style: {
      'background-color': '#2d2000',
      'label': 'data(label)',
      'color': '#e3b341',
      'text-valign': 'center',
      'text-halign': 'center',
      'font-size': '10px',
      'width': '100px',
      'height': '38px',
      'shape': 'roundrectangle',
      'text-wrap': 'wrap',
      'text-max-width': '90px',
      'border-width': '1px',
      'border-color': '#9e6a03',
    },
  },
  {
    selector: 'node[type="external"]',
    style: {
      'background-color': '#161b22',
      'label': 'data(label)',
      'color': '#8b949e',
      'text-valign': 'center',
      'text-halign': 'center',
      'font-size': '10px',
      'width': '100px',
      'height': '38px',
      'shape': 'roundrectangle',
      'text-wrap': 'wrap',
      'text-max-width': '90px',
      'border-width': '2px',
      'border-color': '#484f58',
      'border-style': 'dashed',
    },
  },
  {
    selector: 'node:selected',
    style: {
      'border-color': '#e6edf3',
      'border-width': '3px',
    },
  },
  {
    selector: 'node.hover',
    style: {
      'border-color': '#ffffff',
      'border-width': '2px',
      'opacity': 1,
    },
  },
  {
    selector: 'edge[type="uses"]',
    style: {
      'line-color': '#3fb950',
      'target-arrow-color': '#3fb950',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      'label': 'data(label)',
      'font-size': '9px',
      'color': '#3fb950',
      'text-background-color': '#0d1117',
      'text-background-opacity': 0.85,
      'text-background-padding': '2px',
      'width': 1.5,
    },
  },
  {
    selector: 'edge[type="employs"]',
    style: {
      'line-color': '#58a6ff',
      'target-arrow-color': '#58a6ff',
      'target-arrow-shape': 'triangle',
      'line-style': 'dashed',
      'curve-style': 'bezier',
      'label': 'data(label)',
      'font-size': '9px',
      'color': '#58a6ff',
      'text-background-color': '#0d1117',
      'text-background-opacity': 0.85,
      'text-background-padding': '2px',
      'width': 1.5,
    },
  },
  {
    selector: 'edge[type="shared_technique"]',
    style: {
      'line-color': '#d29922',
      'target-arrow-shape': 'none',
      'line-style': 'dotted',
      'curve-style': 'bezier',
      'label': 'data(label)',
      'font-size': '9px',
      'color': '#d29922',
      'text-background-color': '#0d1117',
      'text-background-opacity': 0.85,
      'text-background-padding': '2px',
      'width': 2.5,
    },
  },
  {
    selector: 'edge[type="related"]',
    style: {
      'line-color': '#f0883e',
      'target-arrow-color': '#f0883e',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      'label': 'data(label)',
      'font-size': '9px',
      'color': '#f0883e',
      'text-background-color': '#0d1117',
      'text-background-opacity': 0.85,
      'text-background-padding': '2px',
      'width': 1.5,
    },
  },
  {
    selector: 'edge[type="cross_group"]',
    style: {
      'line-color': '#bc8cff',
      'target-arrow-color': '#bc8cff',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      'label': 'data(label)',
      'font-size': '9px',
      'color': '#bc8cff',
      'text-background-color': '#0d1117',
      'text-background-opacity': 0.85,
      'text-background-padding': '2px',
      'width': 2,
    },
  },
]

export default function GraphView({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cyRef = useRef<cytoscape.Core | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!containerRef.current) return

    const cy = cytoscape({
      container: containerRef.current,
      elements: [
        ...data.nodes.map((n) => ({ data: { ...n } })),
        ...data.edges.map((e) => ({ data: { ...e } })),
      ],
      style: NODE_STYLES,
      layout: {
        name: 'cose',
        animate: false,
        fit: true,
        padding: 60,
        nodeRepulsion: () => 12000,
        nodeOverlap: 30,
        idealEdgeLength: () => 140,
        edgeElasticity: () => 80,
        nestingFactor: 1.2,
        gravity: 60,
        numIter: 1200,
        initialTemp: 250,
        coolingFactor: 0.95,
        minTemp: 1.0,
      } as cytoscape.LayoutOptions,
      minZoom: 0.3,
      maxZoom: 3,
      wheelSensitivity: 0.3,
    })

    cyRef.current = cy

    // Hover highlight
    cy.on('mouseover', 'node', (e) => {
      e.target.addClass('hover')
      ;(containerRef.current as HTMLDivElement).style.cursor = e.target.data('href')
        ? 'pointer'
        : 'default'
    })
    cy.on('mouseout', 'node', (e) => {
      e.target.removeClass('hover')
      ;(containerRef.current as HTMLDivElement).style.cursor = 'default'
    })

    // Click to navigate
    cy.on('tap', 'node', (e) => {
      const href = e.target.data('href') as string | undefined
      if (href) router.push(href)
    })

    return () => {
      cy.destroy()
      cyRef.current = null
    }
  }, [data, router])

  function resetView() {
    cyRef.current?.fit(undefined, 60)
  }

  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        className="w-full rounded-lg border border-[#30363d] bg-[#0d1117]"
        style={{ height: '660px' }}
      />
      <button
        onClick={resetView}
        className="absolute top-3 right-3 text-xs text-[#8b949e] bg-[#161b22] border border-[#30363d] px-2.5 py-1 rounded hover:text-[#e6edf3] hover:border-[#8b949e] transition-colors"
      >
        ⟲ Reset view
      </button>
    </div>
  )
}
