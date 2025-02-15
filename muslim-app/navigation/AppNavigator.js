import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen.js';
import QuranScreen from '../screens/QuranScreen.js';
import SurahDetailScreen from '../screens/SurahDetailScreen.js';
import HijriCalendarScreen from '../screens/HijriCalendarScreen.js';
import QiblaScreen from '../screens/QiblaScreen.js';
import PrayerTimesScreen from '../screens/PrayerTimesScreen.js';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator untuk Quran
function QuranStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="QuranScreen" component={QuranScreen} options={{ title: 'Al-Qur\'an' }} />
      <Stack.Screen name="SurahDetail" component={SurahDetailScreen} options={{ title: 'Detail Surah' }} />
    </Stack.Navigator>
  );
}

// Bottom Tab Navigator
export default function AppNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{ tabBarActiveTintColor: '#2a5298', tabBarInactiveTintColor: 'gray' }}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
          headerShown: false
        }} 
      />
      <Tab.Screen 
        name="Quran" 
        component={QuranStack} 
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="book" color={color} size={size} />,
          headerShown: false
        }} 
      />
      <Tab.Screen 
        name="Hijriah" 
        component={HijriCalendarScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" color={color} size={size} />
        }} 
      />
      <Tab.Screen 
        name="Qibla" 
        component={QiblaScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="compass" color={color} size={size} />
        }} 
      />
      <Tab.Screen 
        name="Sholat" 
        component={PrayerTimesScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="time" color={color} size={size} />
        }} 
      />
    </Tab.Navigator>
  );
}
