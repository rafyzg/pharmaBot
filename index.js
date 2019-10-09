const Telegraf = require('telegraf')
const Router = require('telegraf/router')
const Extra = require('telegraf/extra')
const handler = require('./handler')
const token = process.env.BOT_TOKEN || '943452347:AAFc2b10bAlVfWQLuYUpAyUhZHEvttFhYPE';
const bot = new Telegraf(token);
const cityMarkup = handler.cityMarkup();

//Router middleware for all Callback requests
const pharmaBot = new Router(({ callbackQuery}) => {
    if(!callbackQuery.data) {
        return 
    }
    const parts = callbackQuery.data.split(':');
    return {
        route : parts[0],
        state : {
            id : parseInt(parts[1], 10) || 0
        }
    }
});

//For a case city is chosen -> represent all the available pharms in the city
pharmaBot.on('city', (ctx) => {
    const pharmaMarkup = handler.pharmaMarkup(ctx.state.id); //Building the keyboard markup
    return ctx.editMessageText(`בחר פארמה:`, Extra.markup(pharmaMarkup)).catch(() => undefined)
});

//For a case pharma is chosen
pharmaBot.on('pharma', (ctx) => {
    const pharma = handler.getPharmReply(ctx.state.id); //Getting information of chosen pharma
    
    return ctx.reply(pharma.txt, Extra.HTML().markup(pharma.markup));
});
//Show supply update options
pharmaBot.on('supply', (ctx) => {
    return ctx.answerCbQuery('לעדכון מלאי נא לרשום(בהודעה אחת) את העיר, שם בית המרקחת ומה זמין במלאי\nתודה רבה!', true)
    .then(() => ctx.editMessageText('לעדכון מלאי נא לרשום(בהודעה אחת) את העיר, שם בית המרקחת ומה זמין במלאי\nתודה רבה!'))
});

bot.start((ctx) => ctx.reply('בחר עיר:', Extra.markup(cityMarkup))); //Just started conversation
bot.on('callback_query', pharmaBot);
bot.on('text', (ctx) => { //Update received
    handler.saveUpdate(ctx.message);
    ctx.reply('🤘');
});
bot.launch();
