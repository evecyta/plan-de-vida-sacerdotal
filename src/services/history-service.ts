import dayjs, { Dayjs } from "dayjs";

import { Devotion } from "@/data/devotions";

import PlanService from "./plan-service";
import StatisticsService from "./statistics";

export interface HistoryDay {

  date: Dayjs;

  devotions: Devotion[];

  completed: number;

  total: number;

  percentage: number;

}

class HistoryService {

  /**
   * Carga un día.
   */
  async loadDay(
    date: Dayjs
  ): Promise<HistoryDay> {

    const devotions =
      await PlanService.load(date);

    return {

      date,

      devotions,

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

  /**
   * Últimos días.
   */
  async loadLastDays(
    days: number
  ): Promise<HistoryDay[]> {

    const history: HistoryDay[] = [];

    for (
      let i = days - 1;
      i >= 0;
      i--
    ) {

      const date =
        dayjs().subtract(i, "day");

      history.push(

        await this.loadDay(
          date
        )

      );

    }

    return history;

  }

  /**
   * Semana.
   */
  async loadWeek() {

    return this.loadLastDays(7);

  }
    /**
   * Carga todos los días de un mes.
   */
  async loadMonth(
    month: Dayjs
  ): Promise<HistoryDay[]> {

    const history: HistoryDay[] = [];

    let current =
      month.startOf("month");

    const last =
      month.endOf("month");

    while (
      current.isBefore(last) ||
      current.isSame(last, "day")
    ) {

      history.push(
        await this.loadDay(current)
      );

      current =
        current.add(1, "day");

    }

    return history;

  }

  /**
   * Carga un rango de fechas.
   */
  async loadRange(
    start: Dayjs,
    end: Dayjs
  ): Promise<HistoryDay[]> {

    const history: HistoryDay[] = [];

    let current = start;

    while (
      current.isBefore(end) ||
      current.isSame(end, "day")
    ) {

      history.push(
        await this.loadDay(current)
      );

      current =
        current.add(1, "day");

    }

    return history;

  }

  /**
   * Promedio de cumplimiento.
   */
  average(
    history: HistoryDay[]
  ): number {

    if (history.length === 0) {
      return 0;
    }

    const completed =
      history.reduce(
        (sum, day) =>
          sum + day.completed,
        0
      );

    const total =
      history.reduce(
        (sum, day) =>
          sum + day.total,
        0
      );

    if (total === 0) {
      return 0;
    }

    return Math.round(
      (completed / total) * 100
    );

  }

  /**
   * Mejor día.
   */
  bestDay(
    history: HistoryDay[]
  ): HistoryDay | null {

    if (history.length === 0) {
      return null;
    }

    return history.reduce(
      (best, current) =>
        current.percentage >
        best.percentage
          ? current
          : best
    );

  }

  /**
   * Peor día.
   */
  worstDay(
    history: HistoryDay[]
  ): HistoryDay | null {

    if (history.length === 0) {
      return null;
    }

    return history.reduce(
      (worst, current) =>
        current.percentage <
        worst.percentage
          ? current
          : worst
    );

  }

}

export default new HistoryService();