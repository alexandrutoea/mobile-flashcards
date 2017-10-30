import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { fetchDecks } from '../actions';
import Button from '../components/Button';

import styles from '../utils/styles';

import DeckListItem from '../components/DeckListItem';

class HomeView extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    decks: PropTypes.object.isRequired,
    fetchDecks: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchDecks();
  }

  getKey(item) {
    return item.id;
  }

  buildDeckListItem = (deck) => {
    return (
      <DeckListItem
        onPress={ () => this.props.navigation.navigate('Deck', { deckId: deck.item.id, updateHomeView: this.updateHomeView }) }
        text={ deck.item.title }
        items={ deck.item.questions.length }
      />
    );
  }

  updateHomeView(callback) {
    if (callback) callback();
  }

  buildDecksList() {
    const decks = [];
    Object.keys(this.props.decks).forEach((deckId) => {
      const deck = this.props.decks[deckId];
      decks.push(deck);
    });
    return decks;
  }

  render() {
    const totalDecks = Object.keys(this.props.decks).length;
    const decksList = this.buildDecksList();

    return (
      <View style={ styles.homeContainer }>
        <View style={ { alignItems: 'center' } }>
          <Text style={ styles.h1 }> { totalDecks <= 0 ? 'No Decks, please add one' : `${ totalDecks } Deck(s)`} </Text>
          <Button
            primary
            text='Create new deck'
            onPress={ () => this.props.navigation.navigate('CreateDeckView', { updateHomeView: this.updateHomeView }) }
          />
        </View>

        <View style={ styles.deckListContainer }>
          {totalDecks > 0 && <FlatList style={ styles.list } data={ decksList } renderItem={ this.buildDeckListItem } keyExtractor={ this.getKey } />}
        </View>

      </View>
    );
  }
}

// Redux Connect
function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps, { fetchDecks })(HomeView);
