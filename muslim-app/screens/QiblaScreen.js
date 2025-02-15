import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import * as Location from 'expo-location';

export default function QiblaScreen() {
  const [heading, setHeading] = useState(0);
  const qiblaDirection = 292.4806542; // Arah Kiblat dalam derajat
  const rotation = useState(new Animated.Value(0))[0];

  useEffect(() => {
    let magnetometerSubscription;
    
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      magnetometerSubscription = Magnetometer.addListener(({ x, y }) => {
        let angle = Math.atan2(-y, x) * (180 / Math.PI);
        if (angle < 0) angle += 360;
        setHeading(angle);

        const rotationAngle = -angle + qiblaDirection;

        Animated.timing(rotation, {
          toValue: rotationAngle,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });

      Magnetometer.setUpdateInterval(100); // Update setiap 100ms untuk lebih responsif
    })();

    return () => {
      if (magnetometerSubscription) magnetometerSubscription.remove();
    };
  }, []);

  const rotateInterpolation = rotation.interpolate({
    inputRange: [-360, 360],
    outputRange: ['-360deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Arah Kiblat: {Math.round(qiblaDirection)}°</Text>
      <Text style={styles.text}>Azimuth: {Math.round(heading)}°</Text>

      <View style={styles.compassContainer}>
        <View style={styles.compass} />
        
        <Animated.View style={[styles.arrowContainer, { transform: [{ rotate: rotateInterpolation }] }]}>
          <View style={styles.arrow} />
        </Animated.View>

        <View style={styles.centerPoint} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  compassContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 150,
    borderWidth: 3,
    borderColor: '#333',
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  arrowContainer: {
    position: 'absolute',
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 20,  
    borderRightWidth: 20, 
    borderBottomWidth: 70, 
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'red',
    position: 'absolute',
    top: 50, 
  },
  compass: {
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 2,
    borderColor: 'gray',
    backgroundColor: '#ddd',
    position: 'absolute',
  },
  centerPoint: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'black',
    position: 'absolute',
  },
  text: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#333',
  },
});
