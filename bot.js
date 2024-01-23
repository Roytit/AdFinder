const TelegramBot = require('node-telegram-bot-api');

const API_KEY_BOT = '6732013803:AAGzgDfdzagh-uq1R-HHqURUu7hldt7niuM';

const bot = new TelegramBot(API_KEY_BOT, {

    polling: {
        interval: 300,
        autoStart: true
      }
      
    
});

bot.on("polling_error", err => console.log(err.data.error.message));

bot.on('text', async msg => {

    console.log(msg);

})
