const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const citiesArr = ['אילת','אשדוד','באר שבע','גבעת זאב','גבעת שמואל','גדרה','הוד השרון','חולון',
                'חיפה','יבנה','יהוד','יקנעם','ירושלים','כפר סבא','כרמיאל','לוד','מודיעין','נתניה','פתח תקווה','קריית ביאליק',
                'קריית חיים','קריית מוצקין','קריית שמונה','ראשון לציון','רמלה','רמת גן','רעננה','תל אביב','תל מונד'];
const db = low(adapter);
const supplyCategories = {
    t0c24 : {
        sativa : '',
        indica : ''
    },
    t1c20 : {
        sativa : '',
        indica : '',

    },
    t3c15 : {
        sativa : '',
        indica : ''
    },
    t5c10 : {
        sativa : '',
        indica : ''
    },
    t10c10 : {
        sativa : '',
        indica : ''
    },
    t10c2 : {
        sativa : '',
        indica : ''
    },
    t15c3 : {
        sativa : '',
        indica : ''
    },
    t20c4 : {
        sativa : '',
        indica : ''
    }
}

const initDb = async () => {
    try {
        db = await low(adapter);
    } catch(err) {
        throw Error(err);
    }
    db.defaults({ cities: [], pharms: [] }).write();
    return db;
};

const setCities = async(db) => {
    const cities = db.get('cities');
    if(!cities.value().length) { //If cities are empty, fill the table
        for(let i = 0;i < citiesArr.length;i++) {
            cities.push({ id : i, name : citiesArr[i]}).write();
        }
    }
};

const getCities = async(db) => {
    const cities = db.get('cities').value();
    return cities;
};

const getPharms = (cityId) => {
    let i = db.get('pharms').filter({ cityId }).value();
    console.log(i);
    return i;
}
getPharms(2);
const getPharm = (pharmaId) => {
    return db.get('pharms').find({ id : pharmaId}).value();
}

//

module.exports = {
    initDb,
    setCities,
    getCities,
    citiesArr,
    getPharms,
    getPharm
}