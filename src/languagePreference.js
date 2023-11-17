import AsyncStorage from '@react-native-async-storage/async-storage';

// Define a namespace for AsyncStorage keys
const ASYNC_STORAGE_NAMESPACE = '@MyApp';

export const saveLanguagePreference = async (language) => {
  try {
    await AsyncStorage.setItem(`${ASYNC_STORAGE_NAMESPACE}:languagePreference`, language);
  } catch (e) {
    console.error('Failed to save language preference:', e);
  }
};

export const loadLanguagePreference = async () => {
  try {
    const language = await AsyncStorage.getItem(`${ASYNC_STORAGE_NAMESPACE}:languagePreference`);
    return language || 'english'; // Default to English if no preference is saved
  } catch (e) {
    console.error('Failed to load language preference:', e);
    return 'english'; // Default to English in case of error
  }
};
