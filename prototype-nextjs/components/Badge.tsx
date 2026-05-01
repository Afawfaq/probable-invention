import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'nation' | 'tag' | 'success' | 'danger' | 'warning'
  className?: string
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const styles: Record<string, string> = {
    default: 'bg-[#21262d] text-[#e6edf3] border-[#30363d]',
    nation: 'bg-[#0d2d6b] text-[#79c0ff] border-[#1f5eb8]',
    tag: 'bg-[#161b22] text-[#8b949e] border-[#30363d]',
    success: 'bg-[#0d2b1e] text-[#3fb950] border-[#196c2e]',
    danger: 'bg-[#2d1014] text-[#f85149] border-[#8d1a1a]',
    warning: 'bg-[#2d1f00] text-[#d29922] border-[#7d4e00]',
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded border ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
