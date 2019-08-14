var TelegramBot = require('node-telegram-bot-api');
const helper = require('./helper');
// var weather = require('openweather-apis');
// var request = require('request');

const keyboard = require('./keyboard');
const keyboard_buttons = require('./keyboard_buttons');





var token = '722708426:AAEQbPO9hSEKINU9YhT4RxUxVoKx1ZTLZro';
// var openWeatherToken = '2ad912742857d33473367c85068d23c9';
// var openWeatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';


helper.logStart();

var bot = new TelegramBot(token, {
    polling:true
    });


// bot.on('message',function(msg, match){
//     console.log(msg);
// });


switch(msg.text) {
    case keyboard_buttons.home.settings:
    bot.sendMessage(chatId, 'Вы перешли в настройки бота. Вы можете изменить данные о вашем местоположении, настроить отправку напоминаний, а также изменить язык бота.', {
        reply_markup: {
            keyboard: keyboard.settings
        }
    });
    break;
    case keyboard_buttons.home.weather_now:
        // sendTemperature(chatId);
        break
        case keyboard_buttons.home.weather_today:
        break
        case keyboard_buttons.back:
        bot.sendMessage(chatId, 'Пожалуйста, выберите действие.' , {
            reply_markup: {
                keyboard: keyboard.home
            }
        });
    };


bot.onText(/\/start/, msg => {
    const greetingsText = "Здравствуйте, " + msg.from.first_name + "\nВыберете жанр:";
    bot.sendMessage(helper.getChatId(msg), greetingsText, {
        reply_markup: {
            keyboard: keyboard.home
        }
    });
});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});

function sendTemperature(chatId) {
    request('http://api.openweathermap.org/data/2.5/weather?q=Prague', (error, response, body) => {
        if (error) throw new Error(error); 
        if (response.statusCode === 200) {
            const tempData = JSON.parse(body) 
            console.log(tempData)
        };
    });
};
