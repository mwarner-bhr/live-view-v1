import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface MarkdownContentProps {
  text: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ text }) => {
  const components: Components = {
    // Headers
    h1: ({ children }) => (
      <h1 className="text-2xl font-semibold text-[var(--text-neutral-xx-strong)] mt-4 mb-2 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-semibold text-[var(--text-neutral-xx-strong)] mt-3 mb-2 first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-semibold text-[var(--text-neutral-xx-strong)] mt-3 mb-2 first:mt-0">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base font-semibold text-[var(--text-neutral-xx-strong)] mt-2 mb-1 first:mt-0">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-sm font-semibold text-[var(--text-neutral-xx-strong)] mt-2 mb-1 first:mt-0">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-sm font-semibold text-[var(--text-neutral-xx-strong)] mt-2 mb-1 first:mt-0">
        {children}
      </h6>
    ),

    // Paragraphs
    p: ({ children }) => (
      <p className="text-[15px] leading-[22px] text-[var(--text-neutral-xx-strong)] my-2 first:mt-0 last:mb-0">
        {children}
      </p>
    ),

    // Emphasis
    strong: ({ children }) => (
      <strong className="font-semibold text-[var(--text-neutral-xx-strong)]">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-[var(--text-neutral-xx-strong)]">
        {children}
      </em>
    ),

    // Lists
    ul: ({ children }) => (
      <ul className="list-disc ml-5 space-y-1 my-2 text-[15px] leading-[22px] text-[var(--text-neutral-xx-strong)]">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal ml-5 space-y-1 my-2 text-[15px] leading-[22px] text-[var(--text-neutral-xx-strong)]">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-[var(--text-neutral-xx-strong)]">
        {children}
      </li>
    ),

    // Code
    code: ({ inline, children, className }) => {
      if (inline) {
        return (
          <code className="px-1.5 py-0.5 rounded bg-[var(--surface-neutral-xx-weak)] border border-[var(--border-neutral-strong)] font-mono text-sm text-[var(--text-neutral-xx-strong)]">
            {children}
          </code>
        );
      }
      // Block code
      const language = className?.replace('language-', '') || '';
      return (
        <pre className="my-3 p-3 rounded bg-[var(--surface-neutral-xx-weak)] border border-[var(--border-neutral-strong)] overflow-x-auto">
          <code className={`font-mono text-sm text-[var(--text-neutral-xx-strong)] ${className || ''}`}>
            {children}
          </code>
        </pre>
      );
    },

    // Links
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--color-link)] underline hover:text-[var(--color-link-hover)]"
      >
        {children}
      </a>
    ),

    // Blockquotes
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--border-neutral-strong)] pl-4 py-1 my-3 italic text-[var(--text-neutral-strong)]">
        {children}
      </blockquote>
    ),

    // Tables
    table: ({ children }) => (
      <div className="overflow-x-auto my-3">
        <table className="min-w-full border-collapse border border-[var(--border-neutral-strong)]">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-[var(--surface-neutral-xx-weak)]">
        {children}
      </thead>
    ),
    tbody: ({ children }) => (
      <tbody>
        {children}
      </tbody>
    ),
    tr: ({ children }) => (
      <tr className="border-b border-[var(--border-neutral-strong)]">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-2 text-left font-semibold text-[var(--text-neutral-xx-strong)] border border-[var(--border-neutral-strong)]">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2 text-[var(--text-neutral-xx-strong)] border border-[var(--border-neutral-strong)]">
        {children}
      </td>
    ),

    // Horizontal rule
    hr: () => (
      <hr className="my-4 border-t border-[var(--border-neutral-strong)]" />
    ),

    // Strikethrough (from remark-gfm)
    del: ({ children }) => (
      <del className="text-[var(--text-neutral-strong)] line-through">
        {children}
      </del>
    ),
  };

  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;
