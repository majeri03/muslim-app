import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
import PrayerTimeCard from '../components/PrayerTimeCard';

export default function PrayerTimesScreen() {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Izin lokasi diperlukan untuk menampilkan waktu sholat');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchPrayerTimes(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const fetchPrayerTimes = async (lat, lng) => {
    try {
      const date = new Date();
      const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

      const response = await axios.get(
        `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=${lat}&longitude=${lng}&method=2`
      );

      if (response.status === 200) {
        setPrayerTimes(response.data.data.timings);
      } else {
        throw new Error('Gagal mendapatkan data waktu sholat');
      }
    } catch (error) {
      console.error('Error fetching prayer times:', error);
      setError('Terjadi kesalahan saat mengambil waktu sholat');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="blue" />;
  if (error) return <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={Object.entries(prayerTimes)}
        renderItem={({ item }) => <PrayerTimeCard name={item[0]} time={item[1]} />}
        keyExtractor={(item) => item[0]}
      />
    </View>
  );
}
