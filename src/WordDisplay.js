import React from 'react';

function WordDisplay({ word, definitions, example, learningLanguage, language }) {
  const definitionKey = `${language}_definition`;

  // Function to bold the word in the example sentence
  const boldWordOfTheDay = (sentence, wordOfTheDay) => {
    // Extract only the word without parentheses for languages like Korean
    const pureWord = wordOfTheDay.split(' ')[0]; 

    // Use a regex to match the word in the sentence
    const regExp = new RegExp(`(${pureWord})`, 'gi');
    return sentence.replace(regExp, `<strong>$1</strong>`);
  };

  // Update the example sentence with the word in bold
  const exampleWithBoldWord = boldWordOfTheDay(example, word);

  return (
        <div className="wordDisplayContainer">

      <h1 className="apptitle">Daily Vocabulary Builder</h1>
      <p className="wordOfTheDay">{word}</p>
      <p className="definitionOfTheDay">{definitions[definitionKey]}</p>
      <p className="exampleOfTheDay"><span dangerouslySetInnerHTML={{ __html: exampleWithBoldWord }} /></p>
    </div>
  );
}

export default WordDisplay;
