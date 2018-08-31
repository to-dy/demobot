import Telegraf from 'telegraf';

export default class App {
    constructor(token) {
        this.bot = new Telegraf(token);
    }

    start() {
        const bot = this.bot;
        bot.command('start',
            ctx => ctx.reply(`🗣 Welcome to the telegram faq bot\n I'm currently under construction`));

        bot.on('text', ctx => {
            const username = `${ctx.from.first_name}`
            ctx.reply(`Hey ${username}!\nI know you are trying to talk me but I'm currently dumb.. \nCheck back soon when I have awesome super powers 💩`);
        })

        bot.startPolling();
    }
}