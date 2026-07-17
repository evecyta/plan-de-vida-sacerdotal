import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
    StyleSheet,
    TextInput,
    View,
} from "react-native";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChangeText,
  placeholder = "Buscar práctica...",
}: Props) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="magnify"
        size={22}
        color="#888"
      />

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 54,
    backgroundColor: "#FFF",
    borderRadius: 16,
    paddingHorizontal: 16,

    flexDirection: "row",
    alignItems: "center",

    marginBottom: 22,

    borderWidth: 1,
    borderColor: "#E6E6E6",
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#222",
  },
});