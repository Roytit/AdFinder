const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Вставьте свой токен, полученный от BotFather в Telegram
const botToken = '6732013803:AAGzgDfdzagh-uq1R-HHqURUu7hldt7niuM';

const bot = new TelegramBot(botToken, {polling: true});

// Обработка команды /getdata
bot.onText(/\/getdata/, async (msg) => {
  const chatId = msg.chat.id;
  console.log('Бот запущен');

  try {
    console.log("Подключени URL")
    // Вставьте URL вашего API
    const apiUrl = 'http://localhost:3000/api/users';

    console.log("URL подключен")
    
    // Выполнение GET-запроса к API
    const response = await axios.get(apiUrl);

    // Отправка данных из API в чат
    bot.sendMessage(chatId, `Данные из API: ${JSON.stringify(response.data)}`);
  } catch (error) {
    console.error('Ошибка при запросе данных из API:', error.message);
    bot.sendMessage(chatId, 'Произошла ошибка при получении данных из API.');
  }
});

// Приветственное сообщение
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Привет! Я бот, который может получать данные из API. Используй команду /getdata для получения данных.');
});
