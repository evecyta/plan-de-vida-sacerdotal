import dayjs, { Dayjs } from "dayjs";

import { Devotion } from "@/data/devotions";

class StatisticsService {

  /**
   * Solo las prácticas de cumplimiento
   * participan en los porcentajes.
   */
  private checkPractices(
    devotions: Devotion[]
  ): Devotion[] {

    return devotions.filter(
      devotion =>
        devotion.type === "check"
    );

  }

  /**
   * Total realizado.
   */
  completed(
    devotions: Devotion[]
  ): number {

    return this.checkPractices(devotions).reduce(
      (sum, item) => sum + item.completed,
      0
    );

  }

  /**
   * Meta total del día.
   */
  total(
    devotions: Devotion[]
  ): number {

    return this.checkPractices(devotions).reduce(
      (sum, item) => sum + item.target,
      0
    );

  }

  /**
   * Pendientes.
   */
  remaining(
    devotions: Devotion[]
  ): number {

    return Math.max(
      this.total(devotions) - this.completed(devotions),
      0
    );

  }

  /**
   * Porcentaje realizado.
   */
  percentage(
    devotions: Devotion[]
  ): number {

    const total = this.total(devotions);

    if (total === 0) {
      return 0;
    }

    return Math.round(
      (this.completed(devotions) / total) * 100
    );

  }

  /**
   * ¿Está completamente terminado?
   */
  isCompleted(
    devotions: Devotion[]
  ): boolean {

    return this.remaining(devotions) === 0;

  }

  /**
   * Devuelve el progreso entre 0 y 1.
   */
  progress(
    devotions: Devotion[]
  ): number {

    const total = this.total(devotions);

    if (total === 0) {
      return 0;
    }

    return this.completed(devotions) / total;

  }

  /**
   * Fechas de la semana.
   */
  getWeekDates(
    reference: Dayjs = dayjs()
  ): Dayjs[] {

    const dates: Dayjs[] = [];

    for (let i = 6; i >= 0; i--) {

      dates.push(
        reference.subtract(i, "day")
      );

    }

    return dates;

  }

  /**
   * Fechas del mes.
   */
  getMonthDates(
    reference: Dayjs = dayjs()
  ): Dayjs[] {

    const start =
      reference.startOf("month");

    const end =
      reference.endOf("month");

    const dates: Dayjs[] = [];

    let current = start;

    while (

      current.isBefore(end) ||

      current.isSame(end, "day")

    ) {

      dates.push(current);

      current = current.add(
        1,
        "day"
      );

    }

    return dates;

  }

  /**
   * Promedio.
   */
  average(
    values: number[]
  ): number {

    if (values.length === 0) {
      return 0;
    }

    return Math.round(

      values.reduce(

        (sum, value) =>
          sum + value,

        0

      ) / values.length

    );

  }

}

export default new StatisticsService();