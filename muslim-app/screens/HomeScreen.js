import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Assalamu’alaikum</Text>
          <Text style={styles.subtitle}>Selamat datang di Muslim App</Text>
        </View>

        {/* Fitur Menu */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('QiblaScreen')}>
            <Ionicons name="compass" size={40} color="white" />
            <Text style={styles.menuText}>Arah Kiblat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PrayerTimes')}>
            <Ionicons name="time" size={40} color="white" />
            <Text style={styles.menuText}>Jadwal Sholat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('QuranScreen')}>
            <Ionicons name="book" size={40} color="white" />
            <Text style={styles.menuText}>Al-Qur’an</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('DuaScreen')}>
            <Ionicons name="heart" size={40} color="white" />
            <Text style={styles.menuText}>Doa Harian</Text>
          </TouchableOpacity>
        </View>

        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image source={require('../assets/images/muslim-7059888_1920.png')} style={styles.banner} />
          <Text style={styles.bannerText}>Tingkatkan Ibadah, Dekatkan Diri Kepada Allah</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    marginTop: 40,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  menuContainer: {
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  menuItem: {
    width: 150,
    height: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 10,
  },
  menuText: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
    fontWeight: 'bold',
  },
  bannerContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  banner: {
    width: 300,
    height: 150,
    borderRadius: 10,
  },
  bannerText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
