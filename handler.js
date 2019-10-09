const Markup = require('telegraf/markup')
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db/db.json');
const db = low(adapter);

/*
* This function gets all available cities in the db and builds the Markup menu
*/
const cityMarkup = () => {
    const cities = db.get('cities').value();
    let arr = [];
    for(let i = 0; i < cities.length; i++) {
        arr.push(Markup.callbackButton(cities[i].name, `city:${cities[i].id}`))
    }
    return Markup.inlineKeyboard(arr, { columns: 2 });
};

/*
* This function gets cityId (Integer), with this id the function searchs for pharms in the chosen city
* and the returned value is a Markup menu of all pharms in the chosen city
*/
const pharmaMarkup = (cityId) => {
    const pharms = db.get('pharms').filter({ cityId }).value();//Gets all pharms of requested city
    let arr = [];
    for(let i = 0; i < pharms.length; i++) {
        arr.push(Markup.callbackButton(pharms[i].name, `pharma:${pharms[i].id}`));
    }
    return Markup.inlineKeyboard(arr, { columns: 1 });
}
/*
* This function gets a pharma id, And returns a string contains all the necessary information about the pharmas
*/
const getPharmReply = (id) => {
    let pharma =  db.get('pharms').find({ id }).value(); //Find the requested pharma
    let pharmaTxt = `<b>${pharma.name}</b> \n  כתובת: ${pharma.address} \n  טלפון: ${pharma.phone}\n  מלאי: \n`; //print the generic info
    for(key in pharma.supply) {
        let parts = key.toUpperCase().split('C');
        pharmaTxt += parts[0] + '/C' + parts[1] + ": \n"; //print cannabis category properly
        if(pharma.supply[key].sativa !== '' && pharma.supply[key].indica !== '') {
            pharmaTxt += `סאטיבה: ✅ ${pharma.supply[key].sativa} \nאינדיקה: ✅ ${pharma.supply[key].indica}`;
        }
        else if(pharma.supply[key].indica.trim().length == 0 && pharma.supply[key].sativa !== '') {
            pharmaTxt+= `סאטיבה: ✅ ${pharma.supply[key].sativa} \nאינדיקה: ❌ \n`;
        }
        else if(pharma.supply[key].indica !== '' && pharma.supply[key].sativa.trim().length == 0) {
            pharmaTxt+= `סאטיבה: ❌ \nאינדיקה: ✅ ${pharma.supply[key].indica} \n`;
        }
        else {
             pharmaTxt += 'סאטיבה: ❌ \nאינדיקה: ❌ \n';
        }
    }

    pharmaTxt += '*ממליץ בנוסף להתקשר לוודא שהמלאי אכן מעודכן כראוי, ואם כבר התקשרת אז תעדכן בבוט (;\n לחזרה לתפריט הראשי הקלד /start';
    let updateMarkup = Markup.inlineKeyboard([Markup.callbackButton('עדכן מלאי', `supply:${pharma.id}`)]); //update button markup
    return { txt : pharmaTxt, markup : updateMarkup}
}
/*
* This function gets a message, and saves the text of the message, date and username to the db.
*/
const saveUpdate = (message) => {
    db.get('updates')
        .push({message : message.text, time : message.date, user : message.from.username })
        .write();
};
/*
* This function builds the supply Markup menu
*/
const supplyMarkup = (id) => {
    let pharma =  db.get('pharms').find({ id }).value();
    let arr = [];
    for(key in pharma.supply) {
        arr.push(Markup.callbackButton(`${key}-indica`,`update:${id}${key}-`));
        arr.push(Markup.callbackButton(`${key}-sativa`,`update:${id}${key}+`));
    }
    return Markup.inlineKeyboard(arr, { columns: 2 });
}

module.exports = {
    cityMarkup,
    pharmaMarkup,
    getPharmReply,
    supplyMarkup,
    saveUpdate
};