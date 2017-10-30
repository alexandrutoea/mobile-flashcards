/* eslint-disable */
import { ADD_DECK, ADD_CARD, LOAD_DECKS, DELETE_DECK } from '../actions';

const INITIAL_STATE = {};

export default function decks(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_DECKS:
    case DELETE_DECK:
      return action.payload;
    case ADD_DECK:
      return Object.assign({}, state, { [action.deck.id]: action.deck });
    case ADD_CARD:
      let newState = state;
      newState[action.deckId].questions.push(action.card);
      return newState;

    default:
      return state;
  }
}
