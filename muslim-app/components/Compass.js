import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Compass({ heading, qiblaDirection }) {
  return (
    <View style={styles.container}>
      <View style={[styles.arrow, { transform: [{ rotate: `${-heading + qiblaDirection}deg` }] }]} />
      <View style={styles.circle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'black',
    position: 'absolute'
  },
  arrow: {
    width: 10,
    height: 100,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 50
  }
});