<!-- @format -->

### Tempestfolio

This is My personal portfolio website with administrative control

The overall goal is to have a personal website I can resume to as an independent freelancer, but for now lets just manage with updating my tech activities without interacting with the codebase ;)

!["Oluwaniyii Portfolio landing page .png"](./_readme/Screenshot%20from%202022-01-09%2020-51-55.png)

### Features

- Responsive soft User Interface
- Admin control room with authentication
- Managing and storing dynamic data to a cloud database
- Uploading and management of resume & files to a third party data resource (imagekit)
- Receiving mails from the Frontpage

### Get Started

- [Tempestfolio](#tempestfolio)
- [Features](#features)
- [Get Started](#get-started)
- [Set up environment variables](#set-up-environment-variables)
- [Install npm dependencies](#install-npm-dependencies)
- [Run server](#run-server)
- [Testing](#testing)

### Set up environment variables

Rename `*.sample.js` files in `./config` directory:

- `default.sample.js -> default.js`
- `production.sample.js -> production.js`
- `test.sample.js -> test.js`

Rename `.env.example` to `.env` and set your actual values

```
//.env

MONGO_DB=mongodb+srv://<user>:<password>@cluster0-clxgl.mongodb.net/test?retryWrites=true&w=majority
MAILJET_API_KEY=your_mailjet_public_key
```

[node-config](https://github.com/lorenwest/node-config) fails to work so I wrote my own mimmick

### Install npm dependencies

- Run `npm install`

### Run server

- `npm run dev` - development mode
- `npm run start` - production mode

### Testing

- `npm test` - Run unit tests
