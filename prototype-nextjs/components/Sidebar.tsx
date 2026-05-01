'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import type { NavSection } from '@/lib/content'

interface SidebarProps {
  nav: NavSection[]
  groupName?: string
}

export default function Sidebar({ nav, groupName }: SidebarProps) {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(nav.map((s) => s.title))
  )

  function toggle(title: string) {
    setOpenSections((prev) => {
      const next = new Set(prev)
      if (next.has(title)) {
        next.delete(title)
      } else {
        next.add(title)
      }
      return next
    })
  }

  return (
    <aside className="w-60 shrink-0">
      <div className="sticky top-6">
        {groupName && (
          <div className="mb-3 px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#8b949e]">
              APT Group
            </p>
            <p className="text-sm font-bold text-[#58a6ff] truncate">{groupName}</p>
          </div>
        )}

        <nav className="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden">
          {nav.map((section, idx) => {
            const isOpen = openSections.has(section.title)
            return (
              <div
                key={section.title}
                className={idx > 0 ? 'border-t border-[#30363d]' : ''}
              >
                <button
                  onClick={() => toggle(section.title)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-[#8b949e] hover:bg-[#21262d] transition-colors text-left"
                >
                  {section.title}
                  <span className="text-[10px] text-[#484f58]">
                    {isOpen ? '▼' : '▶'}
                  </span>
                </button>

                {isOpen && (
                  <ul className="pb-1">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className={`flex items-center px-4 py-1.5 text-sm transition-colors ${
                              isActive
                                ? 'text-[#58a6ff] bg-[#0d1117] border-l-2 border-[#58a6ff] pl-[14px]'
                                : 'text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d] border-l-2 border-transparent pl-[14px]'
                            }`}
                          >
                            <span className="truncate">{item.label}</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
