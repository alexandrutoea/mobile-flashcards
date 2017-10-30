import { loadDecks, addDeck, addQuestionToDeck, deleteDeck } from '../utils/api';
import { factorObject } from '../utils/tools';

// Action Constants
export const LOAD_DECKS = 'LOAD_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const DELETE_DECK = 'DELETE_DECK';

export function fetchDecks() {
  return (dispatch) => {
    loadDecks().then(data => {
      dispatch({ type: LOAD_DECKS, payload: factorObject(data) });
    });
  };
}

// Deck Functions
export function createDeck(deck) {
  addDeck(deck);
  return {
    type: ADD_DECK,
    deck,
  };
}

export function removeDeck(deckId) {
  return (dispatch) => {
    deleteDeck(deckId).then(loadDecks().then(data => {
      dispatch({ type: LOAD_DECKS, payload: factorObject(data) });
    }));
  };
}

// Card Funtions
export function createCard(card, deckId) {
  addQuestionToDeck(deckId, card);
  return {
    type: ADD_CARD,
    card,
    deckId,
  };
}
