import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';

import styles from '../utils/styles';

const Button = ({ text, primary, onPress }) => {
  return (
    <TouchableOpacity
      style={ primary ? styles.btnPrimary : styles.btnSecondary }
      onPress={ onPress }
    >
      <Text style={ primary ? styles.btnColoredText : styles.btnWhiteText }>{text}</Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  primary: PropTypes.bool,
};

Button.defaultProps = {
  primary: false,
};

export default Button;
