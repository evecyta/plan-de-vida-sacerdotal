import { quotes } from "@/data/quotes";
import dayjs from "dayjs";

class QuotesService {
  getTodayQuote() {
    const index = dayjs().date() % quotes.length;
    return quotes[index];
  }
}

export default new QuotesService();