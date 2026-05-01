import type { Metadata } from 'next'
import Link from 'next/link'
import 'highlight.js/styles/github-dark.css'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'APT Research Platform',
    template: '%s — APT Research Platform',
  },
  description:
    'An ADHD-friendly threat intelligence platform for researching Advanced Persistent Threat groups.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#0d1117] text-[#e6edf3]">
        {/* Navigation header */}
        <header className="sticky top-0 z-50 bg-[#161b22] border-b border-[#30363d] backdrop-blur-sm">
          <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <span className="text-[#f85149] text-xl" aria-hidden>
                ⚡
              </span>
              <span className="font-bold text-[#e6edf3] tracking-tight">
                APT Research Platform
              </span>
              <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-widest text-[#8b949e] bg-[#21262d] border border-[#30363d] px-1.5 py-0.5 rounded">
                Beta
              </span>
            </Link>

            <nav className="flex items-center gap-1 text-sm">
              <Link
                href="/"
                className="px-3 py-1.5 rounded text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d] transition-colors"
              >
                Groups
              </Link>
              <a
                href="https://attack.mitre.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d] transition-colors"
              >
                MITRE ATT&amp;CK ↗
              </a>
            </nav>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-[#30363d] bg-[#161b22] mt-auto">
          <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8b949e]">
            <p>
              APT Research Platform — ADHD-friendly threat intelligence. For educational purposes
              only.
            </p>
            <p>
              Data sourced from public threat intelligence reports. No sensitive material is hosted.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
