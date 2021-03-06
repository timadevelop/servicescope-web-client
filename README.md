<p align="center">
  <a>
    <img width="230" src="./src/assets/images/logo.jpg">
  </a>
</p>
<div align="center">
  <h1>Serviscope Web Client</h1>
  <p>Built with
    <a href="https://github.com/angular/angular">Angular 8</a>
    , <a href="https://github.com/angular/universal/">Angular Universal</a>
    , <a href="https://github.com/NG-ZORRO/ng-zorro-antd">NG-ZORRO</a>
    , <a href="https://github.com/expressjs/express">Express</a>
  </p>
</div>

## ✨ Features / Tech stack

- 🇹 Typescript
- 🍉 Angular
- 🌎 Universal SSR without flickering 🙃
- 🌍 i18n, ngx-translate
- 🐋 Docker

## 📦 Development and production server

Use Docker, docker-compose and .env file for serving: both for development and production mode.
See `Dockerfile` in this repo and provide all `env` variables defined in [timadevelop/servicescope-containers](https://github.com/timadevelop/servicescope-containers).

### 🌍 Localization and SSR

`npm run build:ssr && npm run serve:ssr` to build the application with English locale and serve it using express universal server.
Locale-specific build: `npm run build:ssr-bg` to build the application using Bulgarian locale (see `./src/locale/messages.bg.xlf`).

This project doesn't support dynamic language change, each locale should be served by a different server.

`./node_modules/.bin/ngx-extractor -i src/**/*.ts -f xlf -o src/locale/messages.bg.xlf` to generate sources from ts files.


## 🔗 Links

- [timadevelop/servicescope-backend](https://github.com/timadevelop/servicescope-backend)
- [timadevelop/servicescope-containers](https://github.com/timadevelop/servicescope-containers)

## 🤝 Contact

Email us at [brainhublab@gmail.com](mailto:brainhublab@gmail.com) or [timadevelop@gmail.com](mailto:timadevelop@gmail.com)
