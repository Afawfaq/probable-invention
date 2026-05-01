'use client'

import dynamic from 'next/dynamic'
import type { GraphData } from '@/lib/graph'

// dynamic with ssr:false must live in a Client Component
const GraphView = dynamic(() => import('./GraphView'), { ssr: false })

export default function GraphClient({ data }: { data: GraphData }) {
  return <GraphView data={data} />
}
