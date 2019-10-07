const Telegraf = require('telegraf')
const Router = require('telegraf/router')
const Extra = require('telegraf/extra')
const handler = require('./handler')

const bot = new Telegraf(process.env.BOT_TOKEN);
const cityMarkup = handler.cityMarkup();

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
    
    return ctx.reply(pharma.txt, Extra.markup(pharma.markup));
});
//Update supply
pharmaBot.on('update', (ctx) => {
    let supplyMarkup = handler.supplyMarkup(ctx.state.id);
    return ctx.reply('בחר:',Extra.markup(supplyMarkup))
});


bot.start((ctx) => ctx.reply('בחר עיר:', Extra.markup(cityMarkup))); //Just started conversation
bot.on('callback_query', pharmaBot);
bot.launch();
