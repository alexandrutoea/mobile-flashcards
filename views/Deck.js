import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import { removeDeck } from '../actions';
import Button from '../components/Button';

import styles from '../utils/styles';

// Component Class
class DeckView extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    decks: PropTypes.object.isRequired,
    removeDeck: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.updateDeckView = this.updateDeckView.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
  }

  updateDeckView(callback) {
    this.props.navigation.state.params.updateHomeView();
    this.forceUpdate(() => {
      if (callback) {
        callback();
      }
    });
  }

  startQuiz = (deck) => {
    this.props.navigation.navigate('QuizView', { deck });
  }

  render() {
    const id = this.props.navigation.state.params.deckId;
    const deck = this.props.decks[id];

    return (
      <View style={ styles.homeContainer }>
        <View style={ { alignItems: 'center' } }>
          <Text style={ styles.h1 }>{deck.title}</Text>
          <Text> { deck.questions.length <= 0 ? 'No questions, please add one' : `${ deck.questions.length } Question(s)`} </Text>

          {deck.questions.length > 0 &&
            <Button
              primary
              text='Start quiz'
              onPress={ () => { this.startQuiz(deck); } }
            />
          }
          <Button
            text='Add a new card'
            onPress={ () => this.props.navigation.navigate('CreateCardView', { deckId: id, updateDeckView: this.updateDeckView }) }
          />
          <Button
            text='Delete deck'
            onPress={ () => {
              this.props.removeDeck(id);
              this.props.navigation.goBack();
            } }
          />
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

export default connect(mapStateToProps, { removeDeck })(DeckView);
