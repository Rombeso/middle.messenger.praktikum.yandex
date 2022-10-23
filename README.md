## Проект: Messenger
Практическая работа на курсе Яндекса Практикума "Мидл фронтенд разработчик"

### Ссылка на проект

https://stalwart-pothos-638543.netlify.app/index/index.html

### Ссылка на макет в Figma
https://www.figma.com/file/wKshIyNiBhdURUseuRv2Qe/My-Messanger?node-id=0%3A1

### Ссылка на PR

https://github.com/Rombeso/middle.messenger.praktikum.yandex/pull/2

### Сборка и запуск

Проект собирается в [Parcel](https://parceljs.org/):

```bash
npm run build
```

Сборка и запуск статического сервера на Express:

```bash
npm run start
```

Сборка проекта в Parcel:

```bash
npm run dev
```

### Описание

**Спринт 1**

Свёрстан макет приложения чат в Figma с использованием шаблонизатора Handlebars. Ссылка на макет
Настроена сборка с использованием Parcel и раздача статики сервером на Express
Приложение автоматически деплоится на Netlify из ветки deploy. Ссылка на приложение

**Спринт 2**

Переход на TypeScript
Реализация шины событий (core/EventBus.ts)
Реализация компонента (core/Block.ts) с собственными пропсами, жизненным циклом и реактивным ререндером при изменении пропсов (использованы Proxy)
Приложение переписано с учётом новых компонентов
На основных формах реализована клиентская валидация
Реализация аналога fetch для запросов к серверу (utils/core/HTTPTransport.ts)


### Технологии

- HTML
- CSS (PostCSS)
- JavaScript
- Parcel
- Handlebars
- Express