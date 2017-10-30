import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableHighlight } from 'react-native';

import styles from '../utils/styles';

const DeckListItem = ({ text, items, onPress }) => {
  return (
    <TouchableHighlight style={ styles.deckListItem } onPress={ onPress }>
      <View style={ styles.deckListItemView }>
        <Text style={ styles.h2 }>{text}</Text>
        <Text>{items} Questions</Text>
      </View>
    </TouchableHighlight>
  );
};

DeckListItem.propTypes = {
  text: PropTypes.string.isRequired,
  items: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default DeckListItem;
