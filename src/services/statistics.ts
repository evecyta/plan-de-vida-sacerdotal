import dayjs from "dayjs";

import { Devotion } from "@/data/devotions";

class StatisticsService {
  completed(devotions: Devotion[]): number {
    return devotions.filter((d) => d.completed).length;
  }

  total(devotions: Devotion[]): number {
    return devotions.length;
  }

  percentage(devotions: Devotion[]): number {
    if (devotions.length === 0) return 0;

    return Math.round(
      (this.completed(devotions) / devotions.length) * 100
    );
  }

  remaining(devotions: Devotion[]): number {
    return devotions.filter((d) => !d.completed).length;
  }

  getWeekDates() {
    const dates = [];

    for (let i = 6; i >= 0; i--) {
      dates.push(dayjs().subtract(i, "day"));
    }

    return dates;
  }

  storageKey(date: dayjs.Dayjs) {
    return `daily_devotions_${date.format("YYYY-MM-DD")}`;
  }
}

export default new StatisticsService();