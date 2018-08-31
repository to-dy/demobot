require('dotenv').config();
import App from './App';

const express = require('express');
const app = express();
const token = process.env.BOT_TOKEN;
const bot = new App(token);

app.get('/', (req, res) => res.send('Bot server running!'));

app.listen(3000, () => console.log('Bot server listening on port 3000!'));

bot.start();