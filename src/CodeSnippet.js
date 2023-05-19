import React from 'react';
import './App.css';


function CodeSnippet({ message }) {
  const codeRegex = /```([a-zA-Z]+)?([\s\S]+?)```/g;
  const matches = message.matchAll(codeRegex);

  const parts = [];
  let index = 0;

  for (const match of matches) {
    if (match.index > index) {
      parts.push({
        type: 'text',
        content: message.substring(index, match.index),
      });
    }

    parts.push({
      type: 'code',
      content: match[2],
      language: match[1],
    });

    index = match.index + match[0].length;
  }

  if (index < message.length) {
    parts.push({
      type: 'text',
      content: message.substring(index),
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
          <CodeSnippet
            key={index}
            language={part.language}
            code={part.content}
          />
        )
      )}
    </div>
  );
}

export default CodeSnippet;
