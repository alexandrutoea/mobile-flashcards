import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TextInput, View, Switch } from 'react-native';
import { connect } from 'react-redux';

import { createCard } from '../actions';
import { randomValue } from '../utils/tools';

import Button from '../components/Button';

import styles from '../utils/styles';

class CreateCard extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    decks: PropTypes.object.isRequired,
    createCard: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.validateInput = this.validateInput.bind(this);

    this.state = {
      question: '',
      answer: false,
      inputMessage: '',
    };
  }

  validateInput() {
    if (this.state.question < 3) {
      this.setState({ inputMessage: 'Must be at least 3 Characters long' });
      return;
    }
    this.addCard();
  }

  addCard() {
    const { deckId } = this.props.navigation.state.params;
    const card = {
      id: randomValue(),
      question: this.state.question,
      answer: this.state.answer,
    };
    this.props.createCard(card, deckId);

    this.props.navigation.state.params.updateDeckView(() => {
      this.setState({ inputMessage: 'New Card Added!', question: '', answer: false }, () => {
        setTimeout(() => { this.setState({ inputMessage: '' }); }, 2000);
      });
    });
  }

  render() {
    const id = this.props.navigation.state.params.deckId;
    const deck = this.props.decks[id];
    const { inputMessage } = this.state;

    return (
      <View style={ styles.newInputcontainer }>
        <Text style={ styles.h2 }>Add a card to the </Text>
        <Text style={ styles.h1 }>{deck.title} deck</Text>

        <TextInput
          style={ styles.textInput }
          value={ this.state.question }
          onChangeText={ (question) => this.setState({ question }) }
          placeholder='Enter Question'
        />

        <Text style={ styles.h2 }>Set The Answer</Text>

        <View style={ { flexDirection: 'row' } }>
          <Text style={ { marginRight: 20 } }>False</Text>
          <Switch
            value={ this.state.answer }
            onValueChange={ (value) => this.setState({ answer: value }) }
          />
          <Text style={ { marginLeft: 20 } }>True</Text>
        </View>

        <Text style={ styles.padder } />
        <Text style={ styles.h2 }>{ inputMessage }</Text>
        <Text style={ styles.padder } />

        <Button
          primary
          text='Add'
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
    createCard: (card, deckId) => dispatch(createCard(card, deckId)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateCard);
