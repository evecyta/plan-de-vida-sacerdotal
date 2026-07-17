import dayjs from "dayjs";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  day: number | null;
  status: "empty" | "partial" | "complete";
  onPress?: () => void;
}

export default function CalendarDay({
  day,
  status,
  onPress,
}: Props) {
  if (day === null) {
    return <View style={styles.empty} />;
  }

  const today = dayjs();

  const isToday = today.date() === day;

  function dotColor() {
    switch (status) {
      case "complete":
        return "#123B63";

      case "partial":
        return "#D4A017";

      default:
        return "#D9D9D9";
    }
  }

  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
    >
      <View
        style={[
          styles.dayCircle,
          isToday && styles.today,
        ]}
      >
        <Text style={styles.day}>
          {day}
        </Text>
      </View>

      <View
        style={[
          styles.dot,
          {
            backgroundColor: dotColor(),
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "14.285%",
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  empty: {
    width: "14.285%",
    height: 64,
  },

  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  today: {
    borderWidth: 2,
    borderColor: "#123B63",
  },

  day: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  dot: {
    marginTop: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});