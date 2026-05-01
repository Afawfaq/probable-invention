import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import type { Components } from 'react-markdown'

interface MarkdownRendererProps {
  content: string
}

const components: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold text-[#e6edf3] border-b border-[#30363d] pb-3 mb-6 mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold text-[#e6edf3] border-b border-[#30363d] pb-2 mb-4 mt-8">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-[#cdd9e5] mb-3 mt-6">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-semibold text-[#cdd9e5] mb-2 mt-5">{children}</h4>
  ),
  h5: ({ children }) => (
    <h5 className="text-base font-semibold text-[#cdd9e5] mb-2 mt-4">{children}</h5>
  ),
  h6: ({ children }) => (
    <h6 className="text-sm font-semibold text-[#8b949e] mb-2 mt-4 uppercase tracking-wide">
      {children}
    </h6>
  ),
  p: ({ children }) => (
    <p className="text-[#cdd9e5] leading-relaxed mb-4">{children}</p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-[#58a6ff] hover:underline hover:text-[#79c0ff] transition-colors"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-outside text-[#cdd9e5] mb-4 space-y-1 pl-6">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside text-[#cdd9e5] mb-4 space-y-1 pl-6">{children}</ol>
  ),
  li: ({ children }) => <li className="text-[#cdd9e5] leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-[#58a6ff] bg-[#161b22] px-4 py-3 mb-4 rounded-r-md">
      <div className="text-[#8b949e] italic">{children}</div>
    </blockquote>
  ),
  pre: ({ children }) => (
    <pre className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-4 overflow-x-auto text-sm leading-relaxed">
      {children}
    </pre>
  ),
  code: ({ className, children }) => {
    // Block code has a language class; inline code does not
    if (className) {
      return <code className={`${className} text-sm`}>{children}</code>
    }
    return (
      <code className="bg-[#161b22] text-[#f0883e] px-1.5 py-0.5 rounded text-[0.875em] font-mono border border-[#30363d]">
        {children}
      </code>
    )
  },
  table: ({ children }) => (
    <div className="overflow-x-auto mb-6 rounded-lg border border-[#30363d]">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-[#161b22] border-b border-[#30363d]">{children}</thead>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-[#30363d] last:border-b-0 hover:bg-[#161b22] transition-colors">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2.5 text-left text-xs font-bold text-[#8b949e] uppercase tracking-wider">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2.5 text-[#cdd9e5]">{children}</td>
  ),
  hr: () => <hr className="border-[#30363d] my-8" />,
  strong: ({ children }) => (
    <strong className="text-[#e6edf3] font-semibold">{children}</strong>
  ),
  em: ({ children }) => <em className="text-[#cdd9e5] italic">{children}</em>,
  del: ({ children }) => (
    <del className="text-[#8b949e] line-through">{children}</del>
  ),
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="min-w-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
