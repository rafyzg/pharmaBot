
const Markup = require('telegraf/markup')
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db/db.json');
const db = low(adapter);


const cityMarkup = () => {
    const cities = db.get('cities').value();
    let arr = [];
    for(let i = 0; i < cities.length; i++) {
        arr.push(Markup.callbackButton(cities[i].name, `city:${cities[i].id}`))
    }
    return Markup.inlineKeyboard(arr, { columns: 2 });
};

const pharmaMarkup = (cityId) => {
    const pharms = db.get('pharms').filter({ cityId }).value();//Gets all pharms of requested city
    let arr = [];
    for(let i = 0; i < pharms.length; i++) {
        arr.push(Markup.callbackButton(pharms[i].name, `pharma:${pharms[i].id}`));
    }
    return Markup.inlineKeyboard(arr, { columns: 1 });
}

const supplyMarkup = (id) => {
    let pharma =  db.get('pharms').find({ id }).value();
    let arr = [];
    for(key in pharma.supply) {
        arr.push(`${key}-indica`);
        arr.push(`${key}-sativa`);
    }
    return Markup.keyboard(arr, { columns: 2 });
}

const getPharmReply = (id) => {
    let pharma =  db.get('pharms').find({ id }).value();
    let pharmaTxt = `${pharma.name} \n  כתובת: ${pharma.address} \n  טלפון: ${pharma.phone}\n  מלאי: \n`;
    for(key in pharma.supply) {
        let parts = key.toUpperCase().split('C');
        pharmaTxt += parts[0] + '/C' + parts[1] + ": \n";
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

    pharmaTxt += '*ממליץ בנוסף להתקשר לוודא שהמלאי אכן מעודכן כראוי, ואם כבר התקשרת אז תעדכן בבוט (;\n';
    let updateMarkup = Markup.inlineKeyboard([Markup.callbackButton('עדכן מלאי', `update:${pharma.id}`)]);
    return { txt : pharmaTxt, markup : updateMarkup}
}

module.exports = {
    cityMarkup,
    pharmaMarkup,
    getPharmReply,
    supplyMarkup
};