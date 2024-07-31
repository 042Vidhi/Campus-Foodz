import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import { messmenu } from "@/api/dummydata/MessMenu";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const today = new Date();
  const year = today.getFullYear();
  const monthnames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = today.getMonth();

  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  const daysArray = [];
  let todayIndex = -1;

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isToday = date.toDateString() === today.toDateString();
    if (isToday) todayIndex = day - 1;
    daysArray.push({
      day: date.getDate(),
      date: date,
      dayOfWeek: date.getDay(),
      isToday: isToday,
    });
  }

  const [selectedDate, setSelectedDate] = useState(todayIndex);

  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current && todayIndex >= 0) {
      setTimeout(() => {
        flatListRef.current.scrollToIndex({
          animated: true,
          index: todayIndex,
        });
      }, 500); // Delay to ensure the FlatList has rendered
    }
  }, [todayIndex]);

  const time = ["7:30 AM - 9:30 AM", "12:00 PM - 2:00 PM", "7:30 PM - 9:00 PM"];
  const getMenuForSelectedDay = (dayOfWeek: number) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return messmenu[daysOfWeek[dayOfWeek]];
  };

  const selectedMenu = getMenuForSelectedDay(
    daysArray[selectedDate]?.dayOfWeek
  );

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.heading}>Mess Menu</Text>
      </View>
      <Text style={styles.heading2}>
        {monthnames[month]} {year}
      </Text>
      <FlatList
        ref={flatListRef}
        horizontal={true}
        data={daysArray}
        keyExtractor={(item) => item.date.toISOString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => setSelectedDate(index)}
            style={{ height: 100 }}
          >
            <View
              style={[
                styles.dateItem,
                (item.isToday && selectedDate === -1) || selectedDate === index
                  ? styles.highlighted
                  : null,
              ]}
            >
              <Text
                style={[
                  styles.dateText,
                  (item.isToday && selectedDate === -1) ||
                  selectedDate === index
                    ? styles.highlightedText
                    : null,
                ]}
              >
                {item.day}
              </Text>
              <Text
                style={[
                  styles.dayText,
                  (item.isToday && selectedDate === -1) ||
                  selectedDate === index
                    ? styles.highlightedText
                    : null,
                ]}
              >
                {
                  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
                    item.dayOfWeek
                  ]
                }
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <ScrollView contentContainerStyle={styles.menuContainer}>
        <View style={styles.menuCard}>
          <View>
            <Text style={styles.menuHeading}>Breakfast</Text>

            <Text style={styles.menuHeading2}>
              <Ionicons name="time" /> {time[0]}
            </Text>

            {selectedMenu?.Breakfast.map((item: any, index: any) => (
              <Text
                key={index}
                style={styles.menuItem}
              >{`\u2022 ${item}`}</Text>
            ))}
          </View>
        </View>
        <View style={styles.menuCard}>
          <View>
            <Text style={styles.menuHeading}>Lunch</Text>
            <Text style={styles.menuHeading2}>
              <Ionicons name="time" /> {time[1]}
            </Text>

            {selectedMenu?.Lunch.map((item: any, index: any) => (
              <Text
                key={index}
                style={styles.menuItem}
              >{`\u2022 ${item}`}</Text>
            ))}
          </View>
        </View>
        <View style={styles.menuCard}>
          <View>
            <Text style={styles.menuHeading}>Dinner</Text>
            <Text style={styles.menuHeading2}>
              <Ionicons name="time" /> {time[2]}
            </Text>

            {selectedMenu?.Dinner.map((item: any, index: any) => (
              <Text
                key={index}
                style={styles.menuItem}
              >{`\u2022 ${item}`}</Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#fff",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    textAlign: "center",
    borderRadius: 10,
    marginTop: 20,
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    width: 150,
    backgroundColor: "#f1592a",
  },
  heading2: {
    color: "#f1592a",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dateItem: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    width: 80,
  },
  highlighted: {
    backgroundColor: "#f1592a",
  },
  highlightedText: {
    color: "#ffffff",
  },
  dateText: {
    fontSize: 14,
  },
  dayText: {
    fontSize: 14,
  },
  menuContainer: {
    marginTop: 20,
    paddingBottom: 20, // Ensure there's some padding at the bottom for better scroll experience
  },
  menuCard: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderColor: "#f1592a",
    borderWidth: 1,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 2,
  },
  menuHeading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f1592a",
    borderRadius: 10,
    paddingLeft: 10,
  },
  menuHeading2: {
    color: "#f1592a",
    opacity: 0.68,
    fontSize: 12,
    fontWeight: "600",
    paddingLeft: 10,
  },
  menuTime: {
    fontSize: 12,
    color: "grey",
  },
  menuItem: {
    fontSize: 14,
    color: "#333",
    paddingLeft: 10,
  },
});
