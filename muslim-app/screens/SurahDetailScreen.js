import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

export default function SurahDetailScreen({ route }) {
  const { surahNumber, surahName } = route.params;
  const [ayahs, setAyahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAyahs = async () => {
      try {
        const response = await axios.get(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,id.indonesian`);
        if (response.status === 200) {
          setAyahs(response.data.data);
        } else {
          throw new Error('Gagal mendapatkan data ayat');
        }
      } catch (error) {
        console.error('Error fetching ayah data:', error);
        setError('Terjadi kesalahan saat mengambil ayat');
      } finally {
        setLoading(false);
      }
    };
    fetchAyahs();
  }, [surahNumber]);

  if (loading) return <ActivityIndicator size="large" color="blue" />;
  if (error) return <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.surahTitle}>Surah {surahName}</Text>
      <FlatList
        data={ayahs[0].ayahs}
        renderItem={({ item }) => (
          <View style={styles.ayahContainer}>
            <Text style={styles.arabic}>{item.text}</Text>
            <Text style={styles.translation}>{ayahs[1].ayahs[item.numberInSurah - 1].text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.number.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  surahTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  ayahContainer: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  arabic: {
    fontSize: 20,
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  translation: {
    fontSize: 16,
    marginTop: 5,
    color: '#616161',
  },
});
