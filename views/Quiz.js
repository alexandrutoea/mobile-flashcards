import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, ScrollView } from 'react-native';

import Button from '../components/Button';

import styles from '../utils/styles';

// Component Class
class Quiz extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.submitAnswer = this.submitAnswer.bind(this);
    this.restartQuiz = this.restartQuiz.bind(this);

    const { deck } = this.props.navigation.state.params;
    const cards = deck.questions;
    this.state = {
      correct: 0,
      wrong: 0,
      at: 0,
      deck,
      cards,
      cardsLength: cards.length,
      answerPreview: '',
    };
  }

  submitAnswer(guess) {
    const question = this.state.cards[this.state.at];
    if (guess === question.answer) {
      this.setState((prevState) => {
        return { answerPreview: '', correct: prevState.correct + 1, at: prevState.at + 1 };
      });
    } else {
      this.setState((prevState) => {
        return { answerPreview: '', wrong: prevState.wrong + 1, at: prevState.at + 1 };
      });
    }
  }

  restartQuiz() {
    this.setState({ at: 0, correct: 0, wrong: 0 });
  }

  render() {
    return (
      <ScrollView>
        <View style={ styles.newInputcontainer }>
          <Text style={ styles.h2 }>{this.state.deck.title} Quiz</Text>

          {this.state.cards[this.state.at] !== undefined ?
            <View style={ styles.newInputcontainer }>
              <Text>{`${ this.state.at + 1 } of ${ this.state.cardsLength } questions`}</Text>
              <View style={ { flex: 1, flexDirection: 'row', justifyContent: 'space-around' } }>
                <Text style={ { margin: 10 } }>Correct: {this.state.correct}</Text>
                <Text style={ { margin: 10 } }>Wrong: {this.state.wrong}</Text>
              </View>
              <View style={ styles.padder } />

              <Text style={ styles.h2 }>{this.state.cards[this.state.at].question}</Text>
              <View style={ styles.padder } />
              <Text style={ styles.h2 }>{this.state.answerPreview}</Text>

              <Button
                primary
                text='True'
                onPress={ () => this.submitAnswer(true) }
              />
              <Button
                primary
                text='False'
                onPress={ () => this.submitAnswer(false) }
              />

              <Button
                text='Show answer'
                onPress={ () => this.setState({ answerPreview: String(this.state.cards[this.state.at].answer) }) }
              />
            </View> :
            <View style={ styles.newInputcontainer }>
              <Text style={ styles.headText }>Quiz Over!</Text>
              <Text>Your Score: {(this.state.correct / this.state.cardsLength) * 100}%</Text>
            </View>
          }

          <View style={ styles.padder } />
          <View style={ styles.padder } />

          <Button
            primary
            text='Restart Quiz'
            onPress={ () => this.restartQuiz() }
          />
          <Button
            primary
            text='Back To Deck'
            onPress={ () => this.props.navigation.goBack() }
          />
        </View>
      </ScrollView>
    );
  }
}

export default Quiz;
