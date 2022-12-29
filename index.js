var TelegramBot = require("node-telegram-bot-api");
var token = "your:token";

let city = "prague";
let apiKey = "your_api";

let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

const request = require("request");
const keyboard = require("./keyboard");
const keyboard_buttons = require("./keyboard_buttons");

let message;

var bot = new TelegramBot(token, {
  polling: true,
});

bot.on("message", function (msg, match) {
  const chatId = msg.chat.id;
  switch (msg.text) {
    case keyboard_buttons.home.settings:
      bot.sendMessage(
        chatId,
        "Вы перешли в настройки бота. Вы можете изменить данные о вашем местоположении, настроить отправку напоминаний, а также изменить язык бота.",
        {
          reply_markup: {
            keyboard: keyboard.settings,
          },
        }
      );
      break;
    case keyboard_buttons.home.weather_now:
      request(url, function (err, response, body) {
        if (err) {
          console.log("error:", error);
        } else {
          let weather = JSON.parse(body);
          message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
          bot.sendMessage(chatId, message);
        }
      });

      break;
    case keyboard_buttons.home.weather_today:
      var maintenance =
        "Уважаемый " +
        msg.from.first_name +
        ", данная функция находится в разработке.";
      bot.sendMessage(chatId, maintenance, {
        reply_markup: {
          keyboard: keyboard.home,
        },
      });

      break;

    case keyboard_buttons.home.weather_tommorow:
      var maintenance =
        "Уважаемый " +
        msg.from.first_name +
        ", данная функция находится в разработке.";
      bot.sendMessage(chatId, maintenance, {
        reply_markup: {
          keyboard: keyboard.home,
        },
      });
      break;

    case keyboard_buttons.home.weather_week:
      var maintenance =
        "Уважаемый " +
        msg.from.first_name +
        ", данная функция находится в разработке.";
      bot.sendMessage(chatId, maintenance, {
        reply_markup: {
          keyboard: keyboard.home,
        },
      });
      break;

    case keyboard_buttons.settings.reminder:
      bot.sendMessage(
        chatId,
        "В какое время вам отправлять прогноз погоды на сегодня?"
      );
      break;

    case keyboard_buttons.settings.laguage:
      bot.sendMessage(chatId, "Выберите ваш язык", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Russian",
                callback_data: "RU",
              },
              {
                text: "English",
                callback_data: "ENG",
              },
            ],
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      });
      break;

    case keyboard_buttons.settings.location:
      const opts = {
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [
              {
                text: "Location",
                callback_data: "whatever",
                request_location: true,
              },
            ],
            [
              {
                text: "Contact",
                callback_data: "whatever",
                request_contact: true,
              },
            ],
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
        }),
      };
      bot.sendMessage(msg.chat.id, "Contact and Location request", opts);
      break;

    case keyboard_buttons.back:
      bot.sendMessage(chatId, "Пожалуйста, выберите действие.", {
        reply_markup: {
          keyboard: keyboard.home,
        },
      });
  }
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const greetingsText =
    "Здравствуйте, " + msg.from.first_name + "\nВыберете жанр:";
  bot.sendMessage(chatId, greetingsText, {
    reply_markup: {
      keyboard: keyboard.home,
    },
  });
});

bot.on("callback_query", (query) => {
  let id = query.message.chat.id;

  switch (query.data) {
    case "RU":
      bot.sendMessage(id, "Вы выбрали русский язык!");

      break;
    case "ENG":
      bot.sendMessage(id, "You have chosen English!");
      break;
  }
});

function sendTemperature(chatId) {
  request(url, function (err, response, body) {
    if (err) {
      console.log("error:", error);
    } else {
      let weather = JSON.parse(body);
      message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
      console.log(message);
    }
  });
}
