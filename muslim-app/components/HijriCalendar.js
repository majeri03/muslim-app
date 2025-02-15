import React from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import HijriDate from 'hijri-date';

export default function HijriCalendar() {
  const today = new HijriDate().toISOString().split('T')[0];

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 10 }}>
        {new HijriDate().toLocaleDateString('en-US')}
      </Text>
      <Calendar
        current={today}
        enableSwipeMonths
        markedDates={{
          [today]: { selected: true, selectedColor: 'green' }
        }}
      />
    </View>
  );
}
