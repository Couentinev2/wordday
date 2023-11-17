import { createAppContainer, createStackNavigator } from 'react-navigation';
import App from './App';
import PreviousWordsPage from './PreviousWordsPage';

const AppNavigator = createStackNavigator(
  {
    App: { screen: App },
    PreviousWords: { screen: PreviousWordsPage },
  },
  {
    initialRouteName: 'App',
  }
);

export default createAppContainer(AppNavigator);