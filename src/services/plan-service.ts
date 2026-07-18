import dayjs, { Dayjs } from "dayjs";

import { Devotion } from "@/data/devotions";

import DailyStatusService from "./daily-status";
import DevotionService from "./devotion-service";

class PlanService {

  /**
   * Carga el Plan de Vida con el estado del día.
   */
  async load(
    date: Dayjs = dayjs()
  ): Promise<Devotion[]> {

    const devotions =
      await DevotionService.loadAll();

    const status =
      await DailyStatusService.load(date);

    return devotions
      .filter(item => item.enabled)
      .map(item => ({

        ...item,

        completed:
          status[item.id] ?? 0,

      }));

  }

  /**
   * Guarda el progreso del día.
   */
  async save(
    devotions: Devotion[],
    date: Dayjs = dayjs()
  ): Promise<void> {

    const status: Record<string, number> = {};

    devotions.forEach(item => {

      status[item.id] =
        item.completed;

    });

    await DailyStatusService.save(
      status,
      date
    );

  }
    /**
   * Alterna una práctica de tipo CHECK.
   */
  async toggleCheck(
    devotion: Devotion,
    date: Dayjs = dayjs()
  ): Promise<number> {

    const next =
      devotion.completed >= devotion.target
        ? 0
        : devotion.completed + 1;

    await DailyStatusService.updateValue(
      devotion.id,
      next,
      date
    );

    return next;

  }

  /**
   * Incrementa un contador.
   */
  async increment(
    devotion: Devotion,
    date: Dayjs = dayjs()
  ): Promise<number> {

    const next =
      devotion.completed + 1;

    await DailyStatusService.updateValue(
      devotion.id,
      next,
      date
    );

    return next;

  }

  /**
   * Disminuye un contador.
   */
  async decrement(
    devotion: Devotion,
    date: Dayjs = dayjs()
  ): Promise<number> {

    const next =
      Math.max(
        devotion.completed - 1,
        0
      );

    await DailyStatusService.updateValue(
      devotion.id,
      next,
      date
    );

    return next;

  }

  /**
   * Asigna un valor manual.
   */
  async setCompleted(

    devotionId: string,

    completed: number,

    date: Dayjs = dayjs()

  ): Promise<void> {

    await DailyStatusService.updateValue(

      devotionId,

      completed,

      date

    );

  }

  /**
   * Reinicia el día.
   */
  async clear(
    date: Dayjs = dayjs()
  ) {

    await DailyStatusService.clear(
      date
    );

  }

    /**
   * Total de metas (solo prácticas tipo check).
   */
  getDailyTarget(
    devotions: Devotion[]
  ): number {

    return devotions

      .filter(item =>
        item.type === "check"
      )

      .reduce(

        (sum, item) =>

          sum + item.target,

        0

      );

  }

  /**
   * Total realizado (solo prácticas tipo check).
   */
  getCompleted(
    devotions: Devotion[]
  ): number {

    return devotions

      .filter(item =>
        item.type === "check"
      )

      .reduce(

        (sum, item) =>

          sum + item.completed,

        0

      );

  }

  /**
   * Porcentaje del día.
   */
  getPercentage(
    devotions: Devotion[]
  ): number {

    const total =
      this.getDailyTarget(
        devotions
      );

    if (total === 0) {
      return 0;
    }

    return Math.round(

      (this.getCompleted(devotions) / total) * 100

    );

  }

}

export default new PlanService();