import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { StackNavigator } from 'react-navigation';

import reducer from './reducer';

import Home from './views/Home';
import CreateDeck from './views/CreateDeck';
import Deck from './views/Deck';
import CreateCard from './views/CreateCard';
import Quiz from './views/Quiz';

import { setReminder } from './utils/tools';

const Stack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
    },
  },
  CreateDeckView: {
    screen: CreateDeck,
    navigationOptions: {
      title: 'Create Deck',
    },
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      title: 'Deck',
    },
  },
  CreateCardView: {
    screen: CreateCard,
    navigationOptions: {
      title: 'Create Card',
    },
  },
  QuizView: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
    },
  },
});

export default class App extends Component {
  componentDidMount() {
    setReminder();
  }

  render() {
    return (
      <Provider store={ createStore(reducer, {}, applyMiddleware(ReduxThunk)) }>
        <View style={ { flex: 1 } }>
          <StatusBar translucent />
          <Stack />
        </View>
      </Provider>
    );
  }
}
