import React, { useEffect, useState } from 'react';
import WordDisplay from './WordDisplay';
import { getWordOfTheDay } from './wordManager';
import { Routes, Route } from 'react-router-dom';
import PreviousWordsPage from './PreviousWordsPage';
import AboutPage from './about';

import MasterMenu from './MasterMenu'; // Import the MasterMenu component
import './styles.css';

function App() {
  const [currentWord, setCurrentWord] = useState({});
  const [interfaceLanguage, setInterfaceLanguage] = useState('english'); // Interface language
  const [learningLanguage, setLearningLanguage] = useState('english'); // Learning language
  const [definitionLanguage, setDefinitionLanguage] = useState('english'); // Definition language
  const [level, setLevel] = useState('intermediate'); // Level selection state

  useEffect(() => {
    loadLanguagePreference();
  }, []);

  useEffect(() => {
    getWordOfTheDay(learningLanguage, definitionLanguage, level).then(word => {
      setCurrentWord(word);
    }).catch(error => {
      console.error('Error fetching word:', error);
    });
  }, [learningLanguage, definitionLanguage, level]);

  const loadLanguagePreference = () => {
    try {
      const savedInterfaceLanguage = localStorage.getItem('interfaceLanguage');
      const savedDefinitionLanguage = localStorage.getItem('definitionLanguage');
      if (savedInterfaceLanguage !== null && savedDefinitionLanguage !== null) {
        setInterfaceLanguage(savedInterfaceLanguage);
        setLearningLanguage(savedInterfaceLanguage);
        setDefinitionLanguage(savedDefinitionLanguage);
      }
    } catch (error) {
      console.error('Failed to load language preference:', error);
    }
  };

  const saveLanguagePreference = (newInterfaceLanguage, newDefinitionLanguage) => {
    try {
      localStorage.setItem('interfaceLanguage', newInterfaceLanguage);
      localStorage.setItem('definitionLanguage', newDefinitionLanguage);
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  };

  const scheduleNotification = () => {
    // Logic to schedule a daily notification with the word of the day
    // This should be implemented in your notificationManager
  };

   const handleInterfaceLanguageChange = (newInterfaceLanguage) => {
    setInterfaceLanguage(newInterfaceLanguage);
    setLearningLanguage(newInterfaceLanguage);
    saveLanguagePreference(newInterfaceLanguage, definitionLanguage);
    scheduleNotification();
  };

  const handleDefinitionLanguageChange = (newDefinitionLanguage) => {
    setDefinitionLanguage(newDefinitionLanguage);
    saveLanguagePreference(interfaceLanguage, newDefinitionLanguage);
    getWordOfTheDay(learningLanguage, newDefinitionLanguage, level).then(word => {
      setCurrentWord(word);
    }).catch(error => {
      console.error('Error fetching word:', error);
    });
  };

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
  };

  return (
    <div className="App">
      <MasterMenu
        interfaceLanguage={interfaceLanguage}
        handleInterfaceLanguageChange={handleInterfaceLanguageChange}
        definitionLanguage={definitionLanguage}
        handleDefinitionLanguageChange={handleDefinitionLanguageChange}
        level={level}
        handleLevelChange={handleLevelChange}
      />
      <h1 className="apptitle">Daily Vocabulary Builder</h1>

      {currentWord.word && (
        <WordDisplay 
          word={currentWord.word}
          definitions={currentWord}
          example={currentWord.example}
          learningLanguage={learningLanguage}
          language={definitionLanguage}
        />
      )}
    </div>
  );
}

export default App;