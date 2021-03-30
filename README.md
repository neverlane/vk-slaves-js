# vk-slaves-js
Node.JS библиотека для взаимодействия с игрой [Рабы](https://vk.com/app7794757) во ВКонтакте.

## Установка
```bash
$ npm i vk-slaves-js
```

## Использование
Для использования методов игры требуется токен пользователя ВКонтакте. Получить его можно [тут](http://vkhost.github.io/).
```javascript
const Slaves = require("vk-slaves-js")
const myaccount = new Slaves("ваш токен")
```
## Примеры
### Получение топа юзеров
```javascript 
const Slaves = require("vk-slaves-js")
const myaccount = new Slaves("ваш токен")

async function start() {
  const stats = await myaccount.top_users()
  console.log(stats)
}

start()
```

## Методы
Методы вы можете найти в файле ```index.js```
