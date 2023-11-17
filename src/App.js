import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import WordDisplay from './WordDisplay'; // Your WordDisplay component
import { getWordOfTheDay } from './wordManager'; // Function to fetch the word of the day

function App() {
  const [currentWord, setCurrentWord] = useState({});
  const [interfaceLanguage, setInterfaceLanguage] = useState('english'); // Interface language
  const [learningLanguage, setLearningLanguage] = useState('english'); // Learning language
  const [definitionLanguage, setDefinitionLanguage] = useState('english'); // Definition language

  useEffect(() => {
    loadLanguagePreference();
  }, []);

  useEffect(() => {
    // Fetch and display the word of the day whenever the learning language changes
    getWordOfTheDay(learningLanguage, definitionLanguage).then(word => {
      console.log('Fetched word:', word); // Log the fetched word
      setCurrentWord(word);
    }).catch(error => {
      console.error('Error fetching word:', error);
    });
  }, [learningLanguage, definitionLanguage]); // Update when either language changes

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
    scheduleNotification(); // Reschedule notification with new language
  };

  const handleDefinitionLanguageChange = (newDefinitionLanguage) => {
    setDefinitionLanguage(newDefinitionLanguage);
    saveLanguagePreference(interfaceLanguage, newDefinitionLanguage);

    // Fetch and display the word of the day with the new definition language
    getWordOfTheDay(learningLanguage, newDefinitionLanguage).then(word => {
      setCurrentWord(word);
    }).catch(error => {
      console.error('Error fetching word:', error);
    });
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
