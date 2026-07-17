import dayjs from "dayjs";
import { StyleSheet, Text, View } from "react-native";

import CalendarDay from "./CalendarDay";

export interface CalendarItem {
  day: number;
  status: "empty" | "partial" | "complete";
}

interface Props {
  month: dayjs.Dayjs;
  days: CalendarItem[];
  onSelectDay?: (day: number) => void;
}

const weekDays = ["L", "M", "X", "J", "V", "S", "D"];

export default function MonthCalendar({
  month,
  days,
  onSelectDay,
}: Props) {
  const firstDay = month.startOf("month");

  const offset = (firstDay.day() + 6) % 7;

  const totalDays = month.daysInMonth();

  const cells: (CalendarItem | null)[] = [];

  for (let i = 0; i < offset; i++) {
    cells.push(null);
  }

  for (let day = 1; day <= totalDays; day++) {
    const found = days.find((d) => d.day === day);

    cells.push(
      found ?? {
        day,
        status: "empty",
      }
    );
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return (
    <View style={styles.container}>
      <View style={styles.weekHeader}>
        {weekDays.map((item) => (
          <Text
            key={item}
            style={styles.weekDay}
          >
            {item}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>
        {cells.map((cell, index) =>
          cell ? (
            <CalendarDay
              key={index}
              day={cell.day}
              status={cell.status}
              onPress={() =>
                onSelectDay?.(cell.day)
              }
            />
          ) : (
            <CalendarDay
              key={index}
              day={null}
              status="empty"
            />
          )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 22,
  },

  weekHeader: {
    flexDirection: "row",
    marginBottom: 10,
  },

  weekDay: {
    width: "14.285%",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: "#777",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});