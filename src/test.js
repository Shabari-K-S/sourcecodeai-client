import React from 'react';
import MessageWithCode from './MessageWithCode';

function App() {
  const message = `
    You can also add other elements to your Streamlit app, such as text boxes, sliders, and plots. Here is an example of a Streamlit program that displays a slider:

    \`\`\`python
    import streamlit as st

    x = st.slider('Select a value')
    st.write(x, 'squared is', x * x)
    \`\`\`

    This program creates a slider that allows you to select a value. It then displays the square of that value on the web page.

    I hope this helps! Let me know if you have any other questions.
  `;

  return (
    <div className="App">
      <MessageWithCode message={message} />
    </div>
  );
}

export default App;
