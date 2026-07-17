import React from "react";
import {
  Text,
  View,
} from "react-native";

import Modal from "./Modal";
import Button from "./Button";

import {
  Colors,
  Spacing,
  Typography,
} from "@/theme";

interface Props {

  visible: boolean;

  title: string;

  message: string;

  confirmText?: string;

  cancelText?: string;

  destructive?: boolean;

  onConfirm(): void;

  onCancel(): void;

}

export default function ConfirmDialog({

  visible,

  title,

  message,

  confirmText = "Aceptar",

  cancelText = "Cancelar",

  destructive = false,

  onConfirm,

  onCancel,

}: Props) {

  return (

    <Modal

      visible={visible}

      title={title}

      onClose={onCancel}

      footer={

        <>

          <Button

            title={cancelText}

            variant="secondary"

            onPress={onCancel}

          />

          <Button

            title={confirmText}

            variant={destructive ? "secondary" : "primary"}

            onPress={onConfirm}

          />

        </>

      }

    >

      <View>

        <Text
          style={{
            ...Typography.body,
            color: Colors.text,
            lineHeight: 24,
            marginBottom: Spacing.md,
          }}
        >

          {message}

        </Text>

      </View>

    </Modal>

  );

}