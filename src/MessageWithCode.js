import React from 'react';
import './test.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function MessageWithCode({ message }) {
  if (!message) {
    return null; // Return null if the message is undefined or null
  }

  const codeRegex = /```([a-zA-Z]+)?([\s\S]+?)```/gm;
  let match;
  const parts = [];
  let lastIndex = 0;

  while ((match = codeRegex.exec(message)) !== null) {
    const [fullMatch, language, content] = match;

    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: message.substring(lastIndex, match.index),
      });
    }

    parts.push({
      type: 'code',
      content,
      language,
    });

    lastIndex =
      codeRegex.lastIndex || (codeRegex.lastIndex === 0 ? codeRegex.lastIndex : message.length);
  }

  if (lastIndex < message.length) {
    parts.push({
      type: 'text',
      content: message.substring(lastIndex),
    });
  }

  return (
    <div className="message-with-code">
      {parts.map((part, index) =>
        part.type === 'text' ? (
          <div key={index} className="message">
            {part.content}
          </div>
        ) : (
          <div key={index} className="code-block">
            {part.language && <div className="language-tag">{part.language}</div>}
            <SyntaxHighlighter language={part.language} style={atomDark} showLineNumbers>
              {part.content}
            </SyntaxHighlighter>
          </div>
        )
      )}
    </div>
  );
}

export default MessageWithCode;
