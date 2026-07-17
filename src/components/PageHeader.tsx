import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Props {
  title: string;
  subtitle?: string;
  backRoute?: string;

  actionIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  actionLabel?: string;
  onActionPress?(): void;
}

export default function PageHeader({
  title,
  subtitle,
  backRoute,

  actionIcon,
  actionLabel,
  onActionPress,

}: Props) {

  const router = useRouter();

  function goBack() {

    if (backRoute) {

      router.replace(backRoute as any);

    } else {

      router.back();

    }

  }

  return (

    <View style={styles.container}>

      <View style={styles.topRow}>

        <Pressable

          onPress={goBack}

          style={styles.backButton}

        >

          <MaterialCommunityIcons
            name="arrow-left"
            size={22}
            color="#123B63"
          />

          <Text style={styles.backText}>
            Volver
          </Text>

        </Pressable>

        {onActionPress && (

          <Pressable

            style={styles.actionButton}

            onPress={onActionPress}

          >

            {actionIcon && (

              <MaterialCommunityIcons
                name={actionIcon}
                size={18}
                color="#123B63"
              />

            )}

            {actionLabel && (

              <Text style={styles.actionText}>

                {actionLabel}

              </Text>

            )}

          </Pressable>

        )}

      </View>

      <Text style={styles.title}>

        {title}

      </Text>

      {!!subtitle && (

        <Text style={styles.subtitle}>

          {subtitle}

        </Text>

      )}

    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    marginBottom: 28,

  },

  topRow: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 18,

  },

  backButton: {

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 12,

    paddingVertical: 8,

    borderRadius: 12,

    backgroundColor: "#EEF4FA",

  },

  backText: {

    marginLeft: 6,

    fontSize: 15,

    fontWeight: "600",

    color: "#123B63",

  },

  actionButton: {

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 12,

    paddingVertical: 8,

    borderRadius: 12,

    backgroundColor: "#EEF4FA",

  },

  actionText: {

    marginLeft: 6,

    fontSize: 14,

    fontWeight: "600",

    color: "#123B63",

  },

  title: {

    fontSize: 32,

    fontWeight: "700",

    color: "#123B63",

  },

  subtitle: {

    marginTop: 8,

    fontSize: 16,

    color: "#666",

    lineHeight: 24,

  },

});