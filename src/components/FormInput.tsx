import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
}

export default function FormInput({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline={multiline}
        style={[
          styles.input,
          multiline && styles.multiline,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  label: {
    fontSize: 15,
    color: "#555",
    marginBottom: 8,
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#FFF",
    borderRadius: 16,

    paddingHorizontal: 18,
    height: 54,

    fontSize: 16,

    borderWidth: 1,
    borderColor: "#E6E8EC",
  },

  multiline: {
    height: 110,
    textAlignVertical: "top",
    paddingTop: 16,
  },
});