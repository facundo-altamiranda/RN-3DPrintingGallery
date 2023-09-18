import React from 'react';
import {StyleProp, StyleSheet, TextStyle, TouchableOpacity} from 'react-native';

interface FloatingActionButtonProps {
  buttonStyle?: StyleProp<TextStyle>;
  children: JSX.Element;
  onPress: () => void;
}

function FloatingActionButton({
  buttonStyle = null,
  children,
  onPress,
}: FloatingActionButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.floatingActionButton, buttonStyle]}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  floatingActionButton: {
    alignItems: 'center',
    borderRadius: 50,
    bottom: 20,
    height: 70,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    width: 70,
  },
});

export default FloatingActionButton;
