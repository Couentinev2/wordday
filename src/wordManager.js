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
export const getWordOfTheDay = async (learningLanguage, definitionLanguage) => {
  try {
    const dayOfYear = getDayOfYear();
    const learningData = require(`./words${learningLanguage === 'english' ? '' : learningLanguage}.json`);
    
    const wordIndex = dayOfYear % learningData.vocabulary.length;
    const word = learningData.vocabulary[wordIndex];
    
    if (definitionLanguage !== 'english') {
      const definitionData = require(`./common${definitionLanguage}_${learningLanguage}.json`);
      const localizedDefinition = definitionData[word.word];
      if (localizedDefinition) {
        word.definition = localizedDefinition;
      }
    }
    
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
