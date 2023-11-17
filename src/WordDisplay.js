import React from 'react';

function WordDisplay({ word, definitions, example, learningLanguage, language }) {
  const definitionKey = `${language}_definition`;
  const definition = definitions[definitionKey] || definitions.definition;

  return (
    <div>
      <h1>{word}</h1>
      <p><strong>Definition:</strong> {definition}</p>
      <p><strong>Example:</strong> {example}</p>
    </div>
  );
}

export default WordDisplay;
