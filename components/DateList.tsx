import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';

function getCurrentMonthDays() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // January is 0, February is 1, and so on
  const monthnames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0); // Last day of the month
  const daysInMonth = lastDay.getDate();
  
  const daysArray = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    daysArray.push({
      day: date.getDate(),
      date: date,
      dayOfWeek: date.getDay(), // 0 for Sunday, 1 for Monday, etc.
      isToday: date.toDateString() === today.toDateString(), // Highlight current date
    });
  }

  return daysArray;
}

const daysOfMonth = getCurrentMonthDays();

export default function DateList() {
  console.log(daysOfMonth); // Log the generated days to verify the data

  return (
    <View style={styles.container}>
      <FlatList
        data={daysOfMonth}
        keyExtractor={(item) => item.date.toISOString()} // Ensure the key is unique and correctly formatted
        renderItem={({ item }) => (
          <View style={[styles.dateItem, item.isToday && styles.highlighted]}>
            <Text style={styles.dateText}>{item.day}</Text>
            <Text style={styles.dayText}>{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][item.dayOfWeek]}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  dateItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  highlighted: {
    backgroundColor: '#f1592a', // Highlight color for the current date
  },
  dateText: {
    fontSize: 16,
  },
  dayText: {
    fontSize: 16,
  },
});
