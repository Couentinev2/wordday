import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WordDisplay from './WordDisplay'; // Your WordDisplay component
import { getWordOfTheDay } from './wordManager'; // Function to fetch the word of the day

function App() {
  const [currentWord, setCurrentWord] = useState({});
  const [language, setLanguage] = useState('english'); // Interface language
  const [learningLanguage, setLearningLanguage] = useState('english'); // Learning language

  useEffect(() => {
    loadLanguagePreference();
    scheduleNotification();
  }, []);

  useEffect(() => {
    // Fetch and display the word of the day whenever the learning language changes
    getWordOfTheDay(learningLanguage).then(word => {
      setCurrentWord(word);
    });
  }, [learningLanguage]);

  const loadLanguagePreference = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('languagePreference');
      if (savedLanguage !== null) {
        setLanguage(savedLanguage);
        setLearningLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Failed to load language preference:', error);
    }
  };

  const saveLanguagePreference = async (newLanguage) => {
    try {
      await AsyncStorage.setItem('languagePreference', newLanguage);
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  };

  const scheduleNotification = () => {
    // Logic to schedule a daily notification with the word of the day
    // This should be implemented in your notificationManager
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setLearningLanguage(newLanguage);
    saveLanguagePreference(newLanguage);
    scheduleNotification(); // Reschedule notification with new language
  };

  return (
    <div className="App">
      <Picker
        selectedValue={learningLanguage}
        onValueChange={(itemValue) => handleLanguageChange(itemValue)}
      >
        <Picker.Item label="English" value="english" />
        <Picker.Item label="French" value="french" />
        <Picker.Item label="Korean" value="korean" />
      </Picker>

      {currentWord.word && (
        <WordDisplay 
          word={currentWord.word} 
          definitions={currentWord}
          example={currentWord.example} 
          learningLanguage={learningLanguage}
        />
      )}
    </div>
  );
}

export default App;
