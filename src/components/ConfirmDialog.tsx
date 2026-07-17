import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

interface Props {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  visible,
  title,
  message,
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.message}>
            {message}
          </Text>

          <View style={styles.buttons}>
            <Pressable
              style={[styles.button, styles.cancel]}
              onPress={onCancel}
            >
              <Text style={styles.cancelText}>
                {cancelText}
              </Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.confirm]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmText}>
                {confirmText}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#123B63",
    marginBottom: 12,
  },

  message: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 28,
    gap: 12,
  },

  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },

  cancel: {
    backgroundColor: "#ECECEC",
  },

  confirm: {
    backgroundColor: "#C62828",
  },

  cancelText: {
    fontWeight: "600",
    color: "#444",
  },

  confirmText: {
    fontWeight: "700",
    color: "#FFF",
  },
});