import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Define a function to load words from your JSON files
const loadPreviousWords = (language, level) => {
  // Replace this with your actual logic to load words from JSON files
  // For this example, we'll use a sample data structure
  const sampleData = {
    english: {
      beginner: ['word1', 'word2', 'word3'],
      intermediate: ['word4', 'word5', 'word6'],
      advanced: ['word7', 'word8', 'word9'],
    },
    french: {
      beginner: ['mot1', 'mot2', 'mot3'],
      intermediate: ['mot4', 'mot5', 'mot6'],
      advanced: ['mot7', 'mot8', 'mot9'],
    },
    korean: {
      beginner: ['단어1', '단어2', '단어3'],
      intermediate: ['단어4', '단어5', '단어6'],
      advanced: ['단어7', '단어8', '단어9'],
    },
  };

  // Replace 'sampleData' with your actual data structure
  return sampleData[language][level];
};

function PreviousWordsPage({ language, level }) {
  const [previousWords, setPreviousWords] = useState([]);

  useEffect(() => {
    // Load previous words when the component mounts
    const words = loadPreviousWords(language, level);
    setPreviousWords(words);
  }, [language, level]);

  return (
    <div>
      <h2>Previous Words</h2>
      <ul>
        {previousWords.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  );
}

export default PreviousWordsPage;
