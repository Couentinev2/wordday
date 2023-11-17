import React from 'react';

function WordDisplay({ word, definitions, example, learningLanguage, language }) {
  // Define the key for the selected language
  const definitionKey = `${language}_definition`;

  return (
    <div>
      <h1>Word of the Day</h1>
      <p>Word: {word}</p>
      <p>Definition: {definitions[definitionKey]}</p>
      <p>Example: {example}</p>
      <p>Learning Language: {learningLanguage}</p>
      <p>Definition Language: {language}</p>
    </div>
  );
}

export default WordDisplay;