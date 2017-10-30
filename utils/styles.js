import { StyleSheet } from 'react-native';
import { white, red, gray, pink } from '../utils/colors';

// fake stylesheet
const styles = StyleSheet.create({
  // typography
  h1: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  h2: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  error: {
    color: red,
  },

  // buttons
  btnPrimary: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: 300,
    margin: 10,
    borderRadius: 6,
    backgroundColor: pink,
    borderColor: pink,
    borderWidth: 1,
  },
  btnColoredText: {
    color: white,
    fontWeight: 'bold',
  },
  btnSecondary: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    padding: 20,
    margin: 10,
    borderRadius: 6,
    backgroundColor: white,
    borderColor: pink,
    borderWidth: 1,
  },
  btnWhiteText: {
    color: pink,
    fontWeight: 'bold',
  },

  // decks
  deckListItem: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: white,
    borderColor: gray,
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 6,
    paddingTop: 10,
    paddingBottom: 10,
  },
  deckListItemView: {
    flex: 1,
    padding: 10,
  },

  // containers
  homeContainer: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'flex-start',
    padding: 10,
  },
  deckListContainer: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 10,
  },
  newInputcontainer: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },

  // input
  textInput: {
    height: 45,
    width: 300,
    marginTop: 20,
    marginBottom: 20,
    padding: 3,
    borderRadius: 6,
    borderColor: pink,
    borderWidth: 1,
  },

  // additional
  padder: {
    marginTop: 20,
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
});

export default styles;
