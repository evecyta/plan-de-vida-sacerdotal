import React from "react";

import EditPracticeModal from "@/components/EditPracticeModal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

import { Devotion } from "@/data/devotions";

interface Props {

  modalVisible: boolean;

  selectedPractice?: Devotion;

  confirmVisible: boolean;

  practiceToDelete?: Devotion;

  onCloseModal(): void;

  onSave(
    practice: Omit<
      Devotion,
      "id" | "order" | "completed"
    >
  ): void;

  onCancelDelete(): void;

  onConfirmDelete(): void;

}

export default function TodayDialogs({

  modalVisible,

  selectedPractice,

  confirmVisible,

  practiceToDelete,

  onCloseModal,

  onSave,

  onCancelDelete,

  onConfirmDelete,

}: Props) {

  return (

    <>

      <EditPracticeModal

        visible={modalVisible}

        practice={selectedPractice}

        onClose={onCloseModal}

        onSave={onSave}

      />

      <ConfirmDialog

        visible={confirmVisible}

        title="Eliminar práctica"

        message={
          practiceToDelete
            ? `¿Deseas eliminar "${practiceToDelete.title}"?`
            : ""
        }

        confirmText="Eliminar"

        destructive

        onCancel={onCancelDelete}

        onConfirm={onConfirmDelete}

      />

    </>

  );

}