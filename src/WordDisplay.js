import React from 'react';
import LearningComponent from './LearningComponent';

function WordDisplay({ word, definitions, example, learningLanguage, language }) {
  // Check if word is available before rendering
  if (!word) {
    return null; // Return null if word is not available
  }

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