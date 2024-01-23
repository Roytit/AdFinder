const mongoose = require('mongoose');
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

//import keyboards
const {
    startKeyboard,
    usersKeyboard,
    adsKeyboard,
    agreementsKeyboard
} = require('./bot-keyboards')

const API_KEY_BOT = '6732013803:AAGzgDfdzagh-uq1R-HHqURUu7hldt7niuM';

const bot = new TelegramBot(API_KEY_BOT, {
    polling: {
      interval: 300,
      autoStart: true,
    },
  });

module.exports = bot


const URL = 'mongodb://localhost:27017/adFinder';

mongoose
  .connect(URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(`DB connection error: ${err}`));


bot.on("polling_error", err => console.log(err.data.error.message));


bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Выберите таблицу:', startKeyboard);
});


bot.on('text', async (msg) => {
    const chatId = msg.chat.id;

    switch (msg.text) {
        case 'Users':
            bot.sendMessage(chatId, 'Выберите действие:', usersKeyboard);
            break;
        case 'Ads':
            bot.sendMessage(chatId, 'Выберите действие:', adsKeyboard);
            break;
        case 'Agreements':
            bot.sendMessage(chatId, 'Выберите действие:', agreementsKeyboard);
            break;
        case 'Back':
            await bot.sendMessage(chatId, 'Выберите таблицу:', startKeyboard);
            break;
    }
});

bot.on('text', async (msg) => {
    const chatId = msg.chat.id;
    switch(msg.text){
        case "Get all users":
            await sendUserList(chatId)
            break;
        case "Get user by ID":
            await sendUser(chatId)
            break;
    }
})

bot.on('text', async (msg) => {
    const chatId = msg.chat.id;
    switch(msg.text){
        case "Get all ads":
            sendAdList(chatId)
            break;
        case "Get ad by ID":
            sendAd(chatId)
            break;
    }
})

bot.on('text', async (msg) => {
    const chatId = msg.chat.id;
    switch(msg.text){
        case "Get all agreements ads":
            await sendAgreementList(chatId)
            break;
        case "Get agreement by ID":
            await sendAgreement(chatId)
            break;
    }
})

//User
async function sendUserList(chatId) {
    try {
        const response = await axios.get("http://localhost:3000/api/users");
        const data = response.data;

        bot.sendMessage(chatId, `Данные из API: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
        console.error('Ошибка при получении данных из API:', error.message);
        bot.sendMessage(chatId, 'Произошла ошибка при получении данных из API.');
    }

}

async function sendUser(chatId) {
    try {
        await bot.sendMessage(chatId, "Отправьте id пользователя");

        const msg = await new Promise((resolve) => {
            bot.once('text', (message) => {
                resolve(message);
            });
        });
        
        const response = await axios.get(`http://localhost:3000/api/user/${msg.text}`);
        const data = response.data;

        bot.sendMessage(chatId, `Данные из API: ${JSON.stringify(data, null, 2)}`);

    } catch (error) {
        console.error('Ошибка:', error.message);
    }
}

//Ads
async function sendAdList(chatId) {
    try {
        const response = await axios.get("http://localhost:3000/api/ads");
        const data = response.data;

        bot.sendMessage(chatId, `Данные из API: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
        console.error('Ошибка при получении данных из API:', error.message);
        bot.sendMessage(chatId, 'Произошла ошибка при получении данных из API.');
    }

}

async function sendAd(chatId) {
    try {
        await bot.sendMessage(chatId, "Отправьте id рекламы");

        const msg = await new Promise((resolve) => {
            bot.once('text', (message) => {
                resolve(message);
            });
        });
        
        const response = await axios.get(`http://localhost:3000/api/ad/${msg.text}`);
        const data = response.data;

        bot.sendMessage(chatId, `Данные из API: ${JSON.stringify(data, null, 2)}`);

    } catch (error) {
        console.error('Ошибка:', error.message);
    }
}

//Agreements
async function sendAgreementList(chatId) {
    try {
        const response = await axios.get("http://localhost:3000/api/agreements");
        const data = response.data;

        bot.sendMessage(chatId, `Данные из API: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
        console.error('Ошибка при получении данных из API:', error.message);
        bot.sendMessage(chatId, 'Произошла ошибка при получении данных из API.');
    }

}

async function sendAgreement(chatId) {
    try {
        await bot.sendMessage(chatId, "Отправьте id соглашения");

        const msg = await new Promise((resolve) => {
            bot.once('text', (message) => {
                resolve(message);
            });
        });
        
        const response = await axios.get(`http://localhost:3000/api/agreement/${msg.text}`);
        const data = response.data;

        bot.sendMessage(chatId, `Данные из API: ${JSON.stringify(data, null, 2)}`);

    } catch (error) {
        console.error('Ошибка:', error.message);
    }
}
