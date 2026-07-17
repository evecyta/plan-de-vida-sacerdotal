import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import {
  Colors,
  Radius,
  Spacing,
  Typography,
} from "@/theme";

interface Props extends TextInputProps {

  label?: string;

  helper?: string;

  error?: string;

}

export default function Input({

  label,

  helper,

  error,

  style,

  ...props

}: Props) {

  return (

    <View style={styles.container}>

      {!!label && (

        <Text
          style={[
            Typography.label,
            styles.label,
          ]}
        >
          {label}
        </Text>

      )}

      <TextInput

        placeholderTextColor={
          Colors.textLight
        }

        style={[

          styles.input,

          error &&
            styles.inputError,

          style,

        ]}

        {...props}

      />

      {!!error ? (

        <Text
          style={styles.error}
        >
          {error}
        </Text>

      ) : !!helper ? (

        <Text
          style={styles.helper}
        >
          {helper}
        </Text>

      ) : null}

    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    marginBottom:
      Spacing.xxl,

  },

  label: {

    marginBottom:
      Spacing.sm,

  },

  input: {

    minHeight: 52,

    borderWidth: 1,

    borderColor:
      Colors.border,

    borderRadius:
      Radius.lg,

    paddingHorizontal:
      Spacing.lg,

    backgroundColor:
      Colors.surface,

    color:
      Colors.text,

    fontSize: 16,

  },

  inputError: {

    borderColor:
      Colors.error,

  },

  helper: {

    marginTop:
      Spacing.sm,

    ...Typography.caption,

  },

  error: {

    marginTop:
      Spacing.sm,

    ...Typography.caption,

    color:
      Colors.error,

  },

});