import React from 'react';


function WordDisplay({ word, definition, example }) {
  return (
    <div>
      <h1>{word}</h1>
      <p><strong>Definition:</strong> {definition}</p>
      <p><strong>Example:</strong> {example}</p>
    </div>
  );
}

export default WordDisplay;


export default LearningComponent;