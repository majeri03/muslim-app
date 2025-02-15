import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen.js';
import PrayerTimesScreen from '../screens/PrayerTimesScreen.js';
import HijriCalendarScreen from '../screens/HijriCalendarScreen.js';
import QiblaScreen from '../screens/QiblaScreen.js';
import QuranScreen from '../screens/QuranScreen.js';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Quran" component={QuranScreen} />
      <Tab.Screen name="Hijriah" component={HijriCalendarScreen} />
      <Tab.Screen name="Qibla" component={QiblaScreen} />
      <Tab.Screen name="Sholat" component={PrayerTimesScreen} />
    </Tab.Navigator>
  );
}