import { getWordOfTheDay } from './wordManager'; // Import the function to get the word of the day


export const scheduleNotification = (language) => {
  // Get the word of the day based on the specified language
  const wordOfTheDay = getWordOfTheDay(language);

  // Schedule a local notification for the next day
  PushNotification.localNotificationSchedule({
    message: `Today's word is: ${wordOfTheDay}. Open the app to learn more!`,
    date: new Date(Date.now() + (60 * 60 * 24 * 1000)), // Schedule for the next day
    repeatType: 'day', // Repeat the notification daily
  });
};