import { useCallback, useEffect, useMemo, useState } from "react";

import {
    Devotion,
    DevotionCategory,
} from "@/data/devotions";

import PlanRepository from "@/repositories/PlanRepository";

export default function useTodayPlan() {

  const [loading, setLoading] =
    useState(true);

  const [editing, setEditing] =
    useState(false);

  const [modalVisible, setModalVisible] =
    useState(false);

  const [selectedPractice, setSelectedPractice] =
    useState<Devotion>();

  const [devotions, setDevotions] =
    useState<Devotion[]>([]);

  const load = useCallback(async () => {

    setLoading(true);

    try {

      const plan =
        await PlanRepository.loadToday();

      setDevotions(plan);

    } finally {

      setLoading(false);

    }

  }, []);

  useEffect(() => {

    load();

  }, [load]);

  useEffect(() => {

    if (!loading) {

      PlanRepository.saveToday(
        devotions
      );

    }

  }, [devotions, loading]);

  async function toggle(
    devotion: Devotion
  ) {

    const completed =
      await PlanRepository.toggle(
        devotion
      );

    setDevotions(current =>

      current.map(item =>

        item.id === devotion.id

          ? {
              ...item,
              completed,
            }

          : item

      )

    );

  }

  function openNew() {

    setSelectedPractice(
      undefined
    );

    setModalVisible(true);

  }

  function openEdit(
    practice: Devotion
  ) {

    setSelectedPractice(
      practice
    );

    setModalVisible(true);

  }

  function closeModal() {

    setModalVisible(false);

    setSelectedPractice(
      undefined
    );

  }

  async function save(
    practice: Omit<
      Devotion,
      "id" | "order" | "completed"
    >
  ) {

    if (selectedPractice) {

      await PlanRepository.updatePractice({

        ...selectedPractice,

        ...practice,

      });

    } else {

      await PlanRepository.addPractice(
        practice
      );

    }

    closeModal();

    await load();

  }

  async function remove(
    practice: Devotion
  ) {

    await PlanRepository.removePractice(
      practice.id
    );

    await load();

  }

  const statistics = useMemo(

    () =>

      PlanRepository.statistics(
        devotions
      ),

    [devotions]

  );

  return {

    state: {

      loading,

      editing,

      modalVisible,

      selectedPractice,

      devotions,

    },

    statistics,

    actions: {

      load,

      toggle,

      save,

      remove,

      openNew,

      openEdit,

      closeModal,

      setEditing,

    },

    helpers: {

      items(
        category: DevotionCategory
      ) {

        return PlanRepository.items(

          devotions,

          category

        );

      },

      completed(
        category: DevotionCategory
      ) {

        return PlanRepository.completed(

          devotions,

          category

        );

      },

      target(
        category: DevotionCategory
      ) {

        return PlanRepository.target(

          devotions,

          category

        );

      },

    },

  };

}