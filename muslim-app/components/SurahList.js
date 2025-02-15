import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SurahList({ surah, navigation }) {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => navigation.navigate('SurahDetail', { surahNumber: surah.number, surahName: surah.englishName })}
    >
      <Text style={styles.surahNumber}>{surah.number}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.surahName}>{surah.englishName}</Text>
        <Text style={styles.surahTranslation}>{surah.englishNameTranslation}</Text>
      </View>
      <Text style={styles.surahArabic}>{surah.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  surahNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  surahName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  surahTranslation: {
    fontSize: 14,
    color: '#616161',
  },
  surahArabic: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4e342e',
  },
});
