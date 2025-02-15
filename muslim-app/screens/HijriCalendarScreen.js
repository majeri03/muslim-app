import React from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment-hijri';

export default function HijriCalendarScreen() {
  const today = moment().format('iYYYY-iMM-iDD'); // Format Hijriah

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 20, textAlign: 'center', margin: 10 }}>
        {moment().format('iD iMMMM iYYYY')} {/* Format tanggal Hijriah */}
      </Text>
      <Calendar
        current={moment().format('YYYY-MM-DD')} // Format Masehi
        enableSwipeMonths
        markedDates={{
          [moment().format('YYYY-MM-DD')]: { selected: true, selectedColor: 'green' }
        }}
      />
    </View>
  );
}
