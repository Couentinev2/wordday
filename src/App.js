import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import WordDisplay from './WordDisplay'; // Your WordDisplay component
import { getWordOfTheDay } from './wordManager'; // Function to fetch the word of the day

function App() {
  const [currentWord, setCurrentWord] = useState({});
  const [interfaceLanguage, setInterfaceLanguage] = useState('english'); // Interface language
  const [learningLanguage, setLearningLanguage] = useState('english'); // Learning language
  const [definitionLanguage, setDefinitionLanguage] = useState('english'); // Definition language
  const [level, setLevel] = useState('intermediate'); // Level selection state

  useEffect(() => {
    loadLanguagePreference();
    const savedLevel = loadLevelPreference();
    setLevel(savedLevel); // Set the initial level based on saved preference
  }, []);

  useEffect(() => {
    // Fetch and display the word of the day whenever any of the dependencies change
    getWordOfTheDay(learningLanguage, definitionLanguage, level).then(word => {
      console.log('Fetched word:', word); // Log the fetched word
      setCurrentWord(word);
    }).catch(error => {
      console.error('Error fetching word:', error);
    });
  }, [learningLanguage, definitionLanguage, level]); // Update when language or level changes

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

  // Function to save the selected level
  const saveLevelPreference = (newLevel) => {
    try {
      localStorage.setItem('levelPreference', newLevel);
    } catch (error) {
      console.error('Failed to save level preference:', error);
    }
  };

  // Function to load the selected level
  const loadLevelPreference = () => {
    try {
      const savedLevel = localStorage.getItem('levelPreference');
      return savedLevel || 'intermediate'; // Default to 'intermediate' if no level is set
    } catch (error) {
      console.error('Failed to load level preference:', error);
      return 'intermediate'; // Default to 'intermediate' in case of error
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
    scheduleNotification(); // Reschedule notification with new language
  };

  const handleDefinitionLanguageChange = (newDefinitionLanguage) => {
    setDefinitionLanguage(newDefinitionLanguage);
    saveLanguagePreference(interfaceLanguage, newDefinitionLanguage);

    // Fetch and display the word of the day with the new definition language
    getWordOfTheDay(learningLanguage, newDefinitionLanguage, level).then(word => {
      setCurrentWord(word);
    }).catch(error => {
      console.error('Error fetching word:', error);
    });
  };

  // Handler for level selection change
  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
    saveLevelPreference(newLevel); // Save the selected level
  };

  return (
    <div className="App">
      <div>
        <label>Learning Language:</label>
        <Picker
          selectedValue={interfaceLanguage}
          onValueChange={(itemValue) => handleInterfaceLanguageChange(itemValue)}
        >
          <Picker.Item label="English" value="english" />
          <Picker.Item label="French" value="french" />
          <Picker.Item label="Korean" value="korean" />
        </Picker>
      </div>
      <div>
        <label>Definition Language:</label>
        <Picker
          selectedValue={definitionLanguage}
          onValueChange={(itemValue) => handleDefinitionLanguageChange(itemValue)}
        >
          <Picker.Item label="English" value="english" />
          <Picker.Item label="French" value="french" />
          <Picker.Item label="Korean" value="korean" />
        </Picker>
      </div>
      <div>
        <label>Level:</label>
        <Picker
          selectedValue={level}
          onValueChange={(itemValue) => handleLevelChange(itemValue)}
        >
          <Picker.Item label="Beginner" value="beginner" />
          <Picker.Item label="Intermediate" value="intermediate" />
          <Picker.Item label="Advanced" value="advanced" />
        </Picker>
      </div>

      {currentWord.word && (
        <WordDisplay 
          word={currentWord.word} 
          definitions={currentWord}
          example={currentWord.example} 
          learningLanguage={learningLanguage}
          language={definitionLanguage} // Pass the definition language
        />
      )}
    </div>
  );
}

export default App;
