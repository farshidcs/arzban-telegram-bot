import axios from "axios";
import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";

const TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
const API_URL = "https://arzb1234.ir/api/rates";

const bot = new TelegramBot(TOKEN);

async function sendRates() {
  try {
    const response = await axios.get(API_URL);
    const data = response.data;

    let message = "📊 نرخ ارز:\n\n";

    for (const key in data) {
      message += `${key} : ${data[key]}\n`;
    }

    await bot.sendMessage(CHANNEL_ID, message);
    console.log("ارسال شد");
  } catch (error) {
    console.error("خطا:", error.message);
  }
}

// هر ۵ دقیقه اجرا شود
cron.schedule("*/5 * * * *", () => {
  console.log("در حال گرفتن دیتا...");
  sendRates();
});

// اجرای اولیه هنگام استارت
sendRates();
