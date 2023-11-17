import AsyncStorage from '@react-native-async-storage/async-storage';
import LearningComponent from './LearningComponent';

// Function to get the current day of the year
const getDayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

export const getWordOfTheDay = async (learningLanguage, definitionLanguage, level = 'intermediate') => {
  try {
    const dayOfYear = getDayOfYear();
    const fileName = `common${learningLanguage}_${level}.json`;
    const learningData = require(`./${fileName}`);

    const wordIndex = dayOfYear % learningData.vocabulary.length;
    const word = learningData.vocabulary[wordIndex];

    if (definitionLanguage !== 'english') {
      const definitionKey = `${definitionLanguage}_definition`;
      const localizedDefinition = word[definitionKey];
      if (localizedDefinition) {
        word.definition = localizedDefinition;
      }
    }

    console.log('Word of the Day:', word); // Add this line to log the word object

    return word;
  } catch (error) {
    console.error(`Failed to load the word of the day for learning language ${learningLanguage} and definition language ${definitionLanguage}:`, error);
    return null;
  }
};



// Function to save the selected languages
export const saveSelectedLanguages = async (learningLanguage, definitionLanguage) => {
  try {
    await AsyncStorage.setItem('learningLanguage', learningLanguage);
    await AsyncStorage.setItem('definitionLanguage', definitionLanguage);
  } catch (error) {
    console.error("Error saving selected languages:", error);
  }
};

// Function to load the selected languages
export const loadSelectedLanguages = async () => {
  try {
    const learningLanguage = await AsyncStorage.getItem('learningLanguage');
    const definitionLanguage = await AsyncStorage.getItem('definitionLanguage');

    return {
      learningLanguage: learningLanguage || 'english',
      definitionLanguage: definitionLanguage || 'english'
    };
  } catch (error) {
    console.error("Error loading selected languages:", error);
    return {
      learningLanguage: 'english',
      definitionLanguage: 'english'
    };
  }
};
