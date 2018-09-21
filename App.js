import Telegraf from 'telegraf';
import google from 'google-search-scraper';

export default class App {
    constructor(token) {
        this.bot = new Telegraf(token);
    }

    start() {
        const bot = this.bot;
        bot.command('start',
            ctx => ctx.reply(`🗣 Hi there!\nAsk me a question by starting with 'q:'`));

        // bot.on('text', ctx => {
        //     const username = `${ctx.from.first_name}`
        //     ctx.reply(`Hey ${username}!\nI know you are trying to talk me but I'm currently dumb.. \nCheck back soon when I have awesome super powers 💩`);
        // })

        bot.hears(/\b(?:hi|hey|hello)\b/gi, (ctx) => ctx.reply('Hey there! remember you can ask me a question by starting with "q:"'))

        bot.hears(/^q:/gi, ctx => {
            ctx.replyWithChatAction(ctx.chat.id, 'typing');
            let q = ctx.message.text;
            let query = q.replace(/^q:/gi, '');
            this.search(query, ctx);
        })

        bot.startPolling();
    }

    search(query, bot) {
        let count = 0;
        google.search({
            query,
            limit: 5,
        }, (err, url, meta) => {
            if (err) throw err;
            const msg = `_You searched for => ${query}_\n*${meta.title}*\n${meta.desc}\n${url}`;
            if (url && meta.title && count <= 3) {
                bot.replyWithMarkdown(msg);
                console.log(msg);
            }
            count++;
        });
    }
}