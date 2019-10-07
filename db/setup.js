const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const citiesArr = ['אילת','אשדוד','באר שבע','גבעת זאב','גבעת שמואל','גדרה','הוד השרון','חולון',
                'חיפה','יבנה','יהוד','יקנעם','ירושלים','כפר סבא','כרמיאל','לוד','מודיעין','נתניה','פתח תקווה','קריית ביאליק',
                'קריית חיים','קריית מוצקין','קריית שמונה','ראשון לציון','רמלה','רמת גן','רעננה','תל אביב','תל מונד'];
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

const pharms = [
    {
        name : 'סופר פארם תמרים אילת',
        address : 'שדרות התמרים 9',
        phone : '077-888-1440',
        cityId : 0
    },
    {
        name : 'בית מרקחת תל חי',
        address : 'תל חי 63',
        phone : '08-867-8795',
        cityId : 1
    },
    {
        name : 'בית מרקחת הנגב בע"מ',
        address : 'קרן קיימת לישראל 94',
        phone : '08-627-7016',
        cityId : 2
    },
    {
        name : 'סופר פארם גראנד קניון באר שבע',
        address : 'טוביהו דוד 125',
        phone : '077-888-2040',
        cityId : 2
    },
    {
        name : 'בית מרקחת גבעת זאב',
        address : 'המכבים 50',
        phone : '02-536-2908',
        cityId : 3
    }
]

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

//Before I continue to create function of setPharms I want to check I am able to present 
// all the related pharms 

const setupPharms = (db) => {
    const pharm = db.get('pharms');
    let date = new Date();
    if(!pharm.value().length) {
        for(let i = 0; i < pharms.length; i++) {
            pharm.push({ id : i, name : pharms[i].name, address : pharms[i].address, phone : pharms[i].phone, lastUpdated : date, cityId : pharms[i].cityId, supply : supplyCategories }).write();
        }
    }
};


const setInfrastarcture = async() => {
    await initDb();
    setCities(db);
    setupPharms(db);
}