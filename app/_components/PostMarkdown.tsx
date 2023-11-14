'use client'

import ReactMarkdown, { Components } from 'react-markdown'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import solarizedDark from 'react-syntax-highlighter/dist/cjs/styles/hljs/solarized-dark'
import solarizedLight from 'react-syntax-highlighter/dist/cjs/styles/hljs/solarized-light'
import tsx from 'react-syntax-highlighter/dist/cjs/languages/hljs/typescript'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/hljs/typescript'
import scss from 'react-syntax-highlighter/dist/cjs/languages/hljs/scss'
import bash from 'react-syntax-highlighter/dist/cjs/languages/hljs/bash'
import markdown from 'react-syntax-highlighter/dist/cjs/languages/hljs/markdown'
import json from 'react-syntax-highlighter/dist/cjs/languages/hljs/json'
import rust from 'react-syntax-highlighter/dist/cjs/languages/hljs/rust'
import swift from 'react-syntax-highlighter/dist/cjs/languages/hljs/swift'
import sql from 'react-syntax-highlighter/dist/cjs/languages/hljs/sql'
import yaml from 'react-syntax-highlighter/dist/cjs/languages/hljs/yaml'
import toml from 'react-syntax-highlighter/dist/cjs/languages/hljs/ini'
import rangeParser from 'parse-numeric-range'
import { IconContext } from 'react-icons'
import { FaCopy } from 'react-icons/fa'
import {
  ColorMode,
  ElementColorType,
  useCustomColorTheme,
} from '../_hooks/useCustomColorTheme'

SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('scss', scss)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('markdown', markdown)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('rust', rust)
SyntaxHighlighter.registerLanguage('swift', swift)
SyntaxHighlighter.registerLanguage('sql', sql)
SyntaxHighlighter.registerLanguage('yaml', yaml)
SyntaxHighlighter.registerLanguage('toml', toml)

type MarkdownProps = {
  markdownContent: string
}

export const PostMarkdown: React.FC<MarkdownProps> = ({ markdownContent }) => {
  const { colorMode, getColorForElement } = useCustomColorTheme()
  const syntaxTheme =
    colorMode === ColorMode.dark ? solarizedDark : solarizedLight

  const MarkdownComponents: Components = {
    p: ({ children }: any) => {
      if (children.type === 'img') return children
      return <p className="text-th-primary-light">{children}</p>
    },
    a: ({ href, children }: any) => {
      return (
        <a href={href} className="text-th-accent-light">
          {children}
        </a>
      )
    },
    code: ({ node, className, children }: any) => {
      const hasLang = /language-(\w+)/.exec(className || '')
      const hasMeta = node?.data?.meta !== undefined

      const applyHighlights = (applyHighlights: number): any => {
        if (hasMeta) {
          const RE = /{([\d,-]+)}/
          const metadata = node.data.meta?.replace(/\s/g, '')
          const strlineNumbers = RE?.test(metadata)
            ? RE?.exec(metadata)![1]
            : '0'
          const highlightLines = rangeParser(strlineNumbers)
          const highlight = highlightLines
          return {
            data: highlight.includes(applyHighlights) ? 'highlight' : null,
          }
        } else {
          return { data: null }
        }
      }

      const codeText: string = node.children
        .map((item: { type: string; value: string }) => item.value)
        .join(' ')

      const codeLanguage = hasLang ? hasLang[1] : 'bash'

      return hasLang ? (
        <div className="relative">
          <CopyToClipboard text={codeText}>
            <button
              className="absolute flex flex-row top-0 right-0 p-3"
              aria-label="Copy text"
            >
              <IconContext.Provider
                value={{
                  color: getColorForElement(ElementColorType.buttonColor),
                }}
              >
                <FaCopy />
              </IconContext.Provider>
            </button>
          </CopyToClipboard>
          <SyntaxHighlighter
            style={syntaxTheme}
            language={codeLanguage}
            PreTag="div"
            className="codeStyle"
            showLineNumbers={true}
            wrapLines={hasMeta}
            useInlineStyles={true}
            lineProps={applyHighlights}
          >
            {children.trimEnd()}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code
          style={{
            fontWeight: 400,
            fontFamily: 'monospace',
            padding: 2,
            margin: 2,
            border: 'none',
            borderRadius: 0,
            backgroundColor: getColorForElement(
              ElementColorType.backgroundColor
            ),
            color: getColorForElement(ElementColorType.textColor),
          }}
        >
          {children}
        </code>
      )
    },
  }

  return (
    <article className="prose">
      <ReactMarkdown components={MarkdownComponents}>
        {markdownContent}
      </ReactMarkdown>
    </article>
  )
}
