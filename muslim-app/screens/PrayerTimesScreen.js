import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
import PrayerTimeCard from '../components/PrayerTimeCard';

export default function PrayerTimesScreen() {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationName, setLocationName] = useState('');

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
      fetchLocationName(location.coords.latitude, location.coords.longitude);
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

  const fetchLocationName = async (lat, lng) => {
    try {
      let reverseGeocode = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
      if (reverseGeocode.length > 0) {
        setLocationName(reverseGeocode[0].city || reverseGeocode[0].region || 'Lokasi tidak ditemukan');
      }
    } catch (error) {
      console.error('Error fetching location name:', error);
    }
  };

  const translatePrayerName = (name) => {
    const names = {
      Fajr: 'Subuh',
      Dhuhr: 'Zuhur',
      Asr: 'Ashar',
      Maghrib: 'Maghrib',
      Isha: 'Isya',
      Sunrise: 'Matahari Terbit',
      Sunset: 'Matahari Terbenam',
      Imsak: 'Imsak',
      Midnight: 'Tengah Malam',
    };
    return names[name] || name;
  };

  if (loading) return <ActivityIndicator size="large" color="blue" />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Waktu Sholat</Text>
        <Text style={styles.subHeaderText}>{locationName}</Text>
      </View>

      {/* Daftar Waktu Sholat */}
      <FlatList
        data={Object.entries(prayerTimes)}
        renderItem={({ item }) => <PrayerTimeCard name={translatePrayerName(item[0])} time={item[1]} />}
        keyExtractor={(item) => item[0]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  subHeaderText: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
});
