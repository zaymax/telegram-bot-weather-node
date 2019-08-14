const keyboard_buttons = require('./keyboard_buttons');

module.exports = {
    home: [
        [keyboard_buttons.home.weather_now, keyboard_buttons.home.weather_today],
        [keyboard_buttons.home.weather_tommorow, keyboard_buttons.home.weather_week],
        [keyboard_buttons.home.settings]
    ],
    settings: [
        [keyboard_buttons.settings.reminder],
        [keyboard_buttons.settings.location, keyboard_buttons.settings.laguage],
        [keyboard_buttons.back]
    ]
}