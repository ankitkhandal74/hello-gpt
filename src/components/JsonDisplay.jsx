import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const JsonDisplay = ({ json }) => {
  const textContent = json?.candidates?.[0]?.content?.parts?.[0]?.text || 'Failed to fetch data';

  return (
    <div>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const codeContent = String(children).replace(/\n$/, '');
            return !inline && match ? (
              <div style={{ position: 'relative' }}>
                <CopyToClipboard text={codeContent}>
                  <button style={{ position: 'absolute', right: 0 }}>Copy</button>
                </CopyToClipboard>
                <SyntaxHighlighter
                  style={dracula}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {codeContent}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          h1: ({ node, ...props }) => <h1 style={{ color: '#333', fontSize: '20px' }} {...props} />,
          h2: ({ node, ...props }) => <h2 style={{ color: '#555' }} {...props} />,
          p: ({ node, ...props }) => <p style={{ lineHeight: '1.6' }} {...props} />,
          strong: ({ node, ...props }) => <strong style={{ fontSize: '20px' }} {...props} />,
        }}
      >
        {textContent}
      </ReactMarkdown>
    </div>
  );
};

export default JsonDisplay;
