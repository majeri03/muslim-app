import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import * as Location from 'expo-location';
import Compass from '../components/Compass';

export default function QiblaScreen() {
  const [heading, setHeading] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(0);
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      let location = await Location.getCurrentPositionAsync({});
      calculateQiblaDirection(location.coords.latitude, location.coords.longitude);
    })();

    Magnetometer.addListener(({ x, y, z }) => {
      let angle = Math.atan2(-y, x) * (180 / Math.PI);
      setHeading(angle);
    });
    Magnetometer.setUpdateInterval(100);

    return () => Magnetometer.removeAllListeners();
  }, []);

  const calculateQiblaDirection = (lat, lng) => {
    const kaabaLat = 21.422487;
    const kaabaLng = 39.826206;
    const phi = (lat * Math.PI) / 180.0;
    const lambda = (lng * Math.PI) / 180.0;
    const kaabaPhi = (kaabaLat * Math.PI) / 180.0;
    const kaabaLambda = (kaabaLng * Math.PI) / 180.0;
    
    const qibla = Math.atan2(
      Math.sin(kaabaLambda - lambda),
      Math.cos(phi) * Math.tan(kaabaPhi) - Math.sin(phi) * Math.cos(kaabaLambda - lambda)
    ) * (180 / Math.PI);
    
    setQiblaDirection(qibla);
  };

  return (
    <View style={styles.container}>
      <Compass heading={heading} qiblaDirection={qiblaDirection} />
      <Text style={styles.text}>Arah Kiblat: {Math.round(qiblaDirection)}°</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, marginTop: 20 }
});