import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';

import Button from '../components/Button';

import styles from '../utils/styles';

import { createDeck } from '../actions';

import { randomValue } from '../utils/tools';

// Component Class
class CreateDeckView extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    createDeck: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.validateInput = this.validateInput.bind(this);

    this.state = {
      deckName: '',
      inputError: '',
    };
  }

  validateInput() {
    if (this.state.deckName.length < 3) {
      this.setState({ inputError: 'Must be at least 3 Characters long' });
      return;
    }
    this.createDeck();
  }

  createDeck() {
    const newDeck = {
      id: randomValue(),
      title: this.state.deckName,
      questions: [],
    };
    this.props.createDeck(newDeck);

    this.props.navigation.state.params.updateHomeView(() => {
      this.props.navigation.navigate('Deck', { deckId: newDeck.id, updateHomeView: this.props.navigation.state.params.updateHomeView });
    });
  }

  render() {
    return (
      <View style={ styles.newInputcontainer }>
        <Text style={ styles.h1 }>Create new deck</Text>

        <TextInput
          style={ styles.textInput }
          value={ this.state.deckName }
          onChangeText={ (deckName) => this.setState({ deckName }) }
          placeholder='Deck name'
        />
        <Text style={ styles.error }>{this.state.inputError}</Text>

        <View style={ styles.padder } />

        <Button
          primary
          text='Create deck'
          onPress={ () => this.validateInput() }
        />
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
function mapDispatchToProps(dispatch) {
  return {
    createDeck: (deck) => dispatch(createDeck(deck)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDeckView);
