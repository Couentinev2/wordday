import AsyncStorage from '@react-native-async-storage/async-storage';


// Function to get the current day of the year
const getDayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

// Function to load the word of the day
export const getWordOfTheDay = async (language) => {
  try {
    const dayOfYear = getDayOfYear();
    const data = require(`./words${language === 'english' ? '' : language}.json`);
    const wordIndex = dayOfYear % data.vocabulary.length;
    return data.vocabulary[wordIndex];
  } catch (error) {
    console.error(`Failed to load the word of the day for language ${language}:`, error);
    return null;
  }
};

// Function to save the selected language
export const saveSelectedLanguage = async (language) => {
  try {
    await AsyncStorage.setItem('selectedLanguage', language);
  } catch (error) {
    console.error("Error saving selected language:", error);
  }
};

// Function to load the selected language
export const loadSelectedLanguage = async () => {
  try {
    const language = await AsyncStorage.getItem('selectedLanguage');
    return language || 'english'; // Default to English if no language is set
  } catch (error) {
    console.error("Error loading selected language:", error);
    return 'english'; // Default to English in case of error
  }
};
