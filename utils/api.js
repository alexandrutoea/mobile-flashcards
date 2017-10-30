import { AsyncStorage } from 'react-native';

export function loadDecks() {
  return AsyncStorage.getAllKeys().then(keys => {
    return AsyncStorage.multiGet(keys).then(stores => {
      return stores.map((result, i, store) => {
        // get at each store's key/value so you can work with it
        const id = store[i][0];
        const value = JSON.parse(store[i][1]);
        return {
          id,
          title: value.title,
          questions: value.questions,
        };
      }).filter(items => {
        if (items) return typeof items.questions !== 'undefined';
        return false;
      });
    });
  });
}

export function addDeck(deck) {
  try {
    return AsyncStorage.setItem(deck.id, JSON.stringify({ title: deck.title, questions: [] }));
  } catch (error) {
    return error;
  }
}

export function deleteDeck(deckId) {
  return AsyncStorage.removeItem(deckId);
}

export function addQuestionToDeck(deckId, question) {
  try {
    AsyncStorage.getItem(deckId).then(result => {
      const data = JSON.parse(result);
      const { questions } = data;
      questions.push(question);
      AsyncStorage.mergeItem(deckId, JSON.stringify({ questions }));
    });
  } catch (error) {
    return error;
  }
  return 'success';
}
