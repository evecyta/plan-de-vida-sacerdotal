import {
  Devotion,
  DevotionCategory,
} from "@/data/devotions";

import PlanService from "@/services/plan-service";
import RuleOfLifeService from "@/services/rule-of-life";
import StatisticsService from "@/services/statistics";

class PlanRepository {

  // -----------------------------
  // PLAN DEL DÍA
  // -----------------------------

  async loadToday(): Promise<Devotion[]> {

    return PlanService.load();

  }

  async reload(): Promise<Devotion[]> {

    return this.loadToday();

  }

  async toggle(
    devotion: Devotion
  ): Promise<number> {

    if (devotion.type === "check") {

      return PlanService.toggleCheck(
        devotion
      );

    }

    return PlanService.increment(
      devotion
    );

  }

  async saveToday(
    devotions: Devotion[]
  ): Promise<void> {

    await PlanService.save(devotions);

  }

  // -----------------------------
  // PLAN DE VIDA
  // -----------------------------

  async addPractice(

    practice: Omit<
      Devotion,
      "id" | "order" | "completed"
    >

  ) {

    await RuleOfLifeService.add({

      ...practice,

    });

  }

  async updatePractice(
    practice: Devotion
  ) {

    await RuleOfLifeService.update(
      practice
    );

  }

  async removePractice(
    id: string
  ) {

    await RuleOfLifeService.remove(id);

  }

  async restorePlan() {

    await RuleOfLifeService.restoreDefaults();

  }

  async reorder(
    devotions: Devotion[]
  ) {

    await RuleOfLifeService.reorder(
      devotions
    );

  }

  // -----------------------------
  // HELPERS
  // -----------------------------

  items(

    devotions: Devotion[],

    category: DevotionCategory

  ) {

    return devotions

      .filter(item =>

        item.category === category

      )

      .sort(

        (a, b) =>

          a.order - b.order

      );

  }

  completed(

    devotions: Devotion[],

    category: DevotionCategory

  ) {

    return this.items(
      devotions,
      category
    ).reduce(

      (sum, item) =>

        sum + item.completed,

      0

    );

  }

  target(

    devotions: Devotion[],

    category: DevotionCategory

  ) {

    return this.items(
      devotions,
      category
    ).reduce(

      (sum, item) =>

        sum + item.target,

      0

    );

  }

  // -----------------------------
  // ESTADÍSTICAS
  // -----------------------------

  statistics(
    devotions: Devotion[]
  ) {

    return {

      completed:
        StatisticsService.completed(
          devotions
        ),

      total:
        StatisticsService.total(
          devotions
        ),

      percentage:
        StatisticsService.percentage(
          devotions
        ),

    };

  }

}

export default new PlanRepository();