import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import SurahList from '../components/SurahList';

export default function QuranScreen() {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await axios.get('https://api.alquran.cloud/v1/surah');
        if (response.status === 200) {
          setSurahs(response.data.data);
        } else {
          throw new Error('Gagal mendapatkan data dari API');
        }
      } catch (error) {
        console.error('Error fetching Quran data:', error);
        setError('Terjadi kesalahan saat mengambil data Al-Qur\'an');
      } finally {
        setLoading(false);
      }
    };
    fetchSurahs();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="blue" />;
  if (error) return <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={surahs}
        renderItem={({ item }) => <SurahList surah={item} />}
        keyExtractor={(item) => item.number.toString()}
      />
    </View>
  );
}
