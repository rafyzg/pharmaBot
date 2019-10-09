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
        address : 'שדרות התמרים 9,אילת',
        phone : '077-888-1440',
        cityId : 0
    },
    {
        name : 'בית מרקחת תל חי',
        address : 'תל חי 63, אשדוד',
        phone : '08-867-8795',
        cityId : 1
    },
    {
        name : 'בית מרקחת הנגב בע"מ',
        address : 'קרן קיימת לישראל 94, באר שבע',
        phone : '08-627-7016',
        cityId : 2
    },
    {
        name : 'סופר פארם גראנד קניון באר שבע',
        address : 'טוביהו דוד 125, באר שבע',
        phone : '077-888-2040',
        cityId : 2
    },
    {
        name : 'בית מרקחת גבעת זאב',
        address : 'המכבים 50, גבעת זאב',
        phone : '02-536-2908',
        cityId : 3
    },
    {
        name : 'בית מרקחת גבעת שמואל בע"מ',
        address : 'בן גוריון 11, גבעת שמואל',
        phone : '03-532-7063',
        cityId : 4
    },
    {
        name : 'סופר פארם גדרה',
        address : 'בן גוריון 105, גדרה',
        phone : '077-888-1460',
        cityId : 5
    },
    {
        name : 'סופר פארם קניון מרגליות הוד השרון',
        address : 'זבוטינסקי 3, הוד השרון',
        phone : '077-888-0540',
        cityId : 6
    },
    {
        name : 'מקס פארם חולון',
        address : 'הנביאים 1, חולון',
        phone : '073-742-4050',
        cityId : 7
    },
    {
        name : 'בית מרקחת בריאות',
        address : 'קראוזה 46, חולון',
        phone : '03-504-1911',
        cityId : 7
    },
    {
        name : 'סופר פארם קניון חולון',
        address : 'גולדה מאיר 7, חולון',
        phone : '077-888-0660',
        cityId : 7
    },
    {
        name : 'סופר פארם חורב',
        address : 'חורב 15, חיפה',
        phone : '077-888-0130',
        cityId : 8
    },
    {
        name : 'בית מרקחת שבתאי לוי',
        address : 'שבתאי לוי 18, חיפה',
        phone : '04-853-4143',
        cityId : 8
    },
    {
        name : 'העלייה השנייה בית מרקחת בע"מ',
        address : 'העלייה השנייה 44, חיפה',
        phone : '04-852-2062',
        cityId : 8
    },
    {
        name : 'סופר פארם רמב"ם',
        address : 'העלייה השנייה 8, חיפה',
        phone : '077-888-2320',
        cityId : 8,
    },
    {
        name : 'סופר פארם גרנד קניון',
        address : 'דרך שמחה גלון 54, חיפה',
        phone : '077-888-0770',
        cityId : 8,
    },
    {
        name : 'הלן פארם בע"מ',
        address : 'אגוז 1, יבנה',
        phone : '08-947-4353',
        cityId : 9,
    },
    {
        name : 'בית מרקחת ישראל',
        address : 'אשכנזי 19, יהוד',
        phone : '08-632-6611',
        cityId : 10,
    },
    {
        name : 'סופר פארם - ביג יקנעם',
        address : 'שדרות יצחק רבין 9, יקנעם',
        phone : '077-888-1510',
        cityId : 11,
    },
    {
        name : 'מדי פלוס בר אילן',
        address : 'בר אילן 2, ירושלים',
        phone : '02-582-2237',
        cityId : 12,
    },
    {
        name : 'מדי פלוס אורנים',
        address : 'שדרות ש"י עגנון 20, ירושלים',
        phone : '02-679-2632',
        cityId : 12,
    },
    {
        name : 'מדי פלוס כנפי נשרים',
        address : 'כנפי נשרים 10, ירושלים',
        phone : '02-651-1155',
        cityId : 12,
    },
    {
        name : 'סופר פארם תלפיות - קניון הדר',
        address : 'גנרל פייר קניג 24, ירושלים',
        phone : '077-888-0950',
        cityId : 12,
    },
    {
        name : 'סופר פארם בית הכרם',
        address : 'אביזוהר 7, ירושלים',
        phone : '077-888-1210',
        cityId : 12,
    },
    {
        name : 'דרייפינגר סילביה קלרה',
        address : 'ויצמן 169, כפר סבא',
        phone : '09-765-9642',
        cityId : 13,
    },
    {
        name : 'בית מרקחת פרמה-שיא',
        address : 'בקעת בית נטופה 25, כפר סבא',
        phone : '077-410-7286',
        cityId : 13,
    },
    {
        name : 'בית מרקחת ברון בע"מ',
        address : 'טשרניחובסקי 24, כפר סבא',
        phone : '09-745-7034',
        cityId : 13,
    },
    {
        name : 'סופר פארם כרמיאל - מרכז ביג',
        address : 'החרושת 14, כרמיאל',
        phone : '077-888-0670',
        cityId : 14,
    },
    {
        name : 'לומינרה פארם בע"מ - פאנקסיה',
        address : 'בת שבע 1, לוד',
        phone : '*5329',
        cityId : 15,
    },
    {
        name : 'סופר פארם קניון מודיעין',
        address : 'לב העיר, מודיעין',
        phone : '077-888-1530',
        cityId : 16,
    },
    {
        name : 'רצפט בע"מ',
        address : 'שדרות ניצה 8, נתניה',
        phone : '09-772-4034',
        cityId : 17,
    },
    {
        name : 'סופר פארם האר"י נתניה',
        address : 'האר"י פינת טום לנטוס, נתניה',
        phone : '077-888-1400',
        cityId : 17,
    },
    {
        name : 'סופר פארם קניון עיר הימים',
        address : 'בני ברמן 2, נתניה',
        phone : '077-888-1910',
        cityId : 17,
    },
    {
        name : 'סופר פארם ביג פולג',
        address : 'גיבורי ישראל 5, נתניה',
        phone : '077-888-1040',
        cityId : 17
    },
    {
        name : 'דראגסטור נט בע"מ',
        address : 'ברגמן צבי 10, פתח תקווה',
        phone : '03-373-1999',
        cityId : 18
    },
    {
        name : 'אי. אפ.גי. פארם',
        address : 'לוחמי הגטו 6, פתח תקווה',
        phone : '03-922-7416',
        cityId : 18
    },
    {
        name : 'סופר פארם קריית ביאליק',
        address : 'פלמ"ח 44, קריית ביאליק',
        phone : '077-888-0150',
        cityId : 19
    },
    {
        name : 'סופר פארם קריית חיים',
        address : 'אחי אילת 34, קריית חיים',
        phone : '077-888-2350',
        cityId : 20
    },
    {
        name : 'סופר פארם קריית מוצקין',
        address : 'שדרות ירושלים 1, קרית מוצקין',
        phone : '077-888-2160',
        cityId : 21
    },
    {
        name : 'סופר פארם קריית שמונה',
        address : 'הנשיא 4, קניון נחמיה, קריית שמונה',
        phone : '077-888-0420',
        cityId : 22
    },
    {
        name : 'טלפארמה - משלוחים עד הבית',
        address : 'טוליפמן 7, ראשון לציון',
        phone : '1-800-616-263',
        cityId : 23
    },
    {
        name : 'סופר פארם קניון הזהב',
        address : 'סחרוב דוד 21, ראשון לציון',
        phone : '077-888-0320',
        cityId : 23
    },
    {
        name : 'סופר פארם רוטשילד ראשון לציון',
        address : 'רוטשילד 45, ראשון לציון',
        phone : '077-888-0460',
        cityId : 23
    },
    {
        name : 'בית מרקחת טללים בע"מ',
        address : 'שדרות הרצל 102, רמלה',
        phone : '08-922-9301',
        cityId : 24
    },
    {
        name : 'נ.נ. פינצי בע"מ',
        address : 'חיבת ציון 42, רמת גן',
        phone : '03-618-2821',
        cityId : 25
    },
    {
        name : 'סופר פארם קניון איילון',
        address : 'דרך אבא הלל 301, רמת גן',
        phone : '077-888-0100',
        cityId : 25
    },
    {
        name : 'סופר פארם קניון רננים',
        address : 'המלאכה 2, רעננה',
        phone : '077-888-0680',
        cityId : 26
    },
    {
        name : 'שלאין',
        address : 'אלנבי 138, תל אביב',
        phone : '03-560-5371',
        cityId : 27
    },
    {
        name : 'סופר פארם ארלוזורוב',
        address : 'דיזנגוף 208, תל אביב',
        phone : '077-888-2200',
        cityId : 27
    },
    {
        name : 'סופר פארם איכילוב',
        address : 'ויצמן 14, תל אביב',
        phone : '077-888-1070',
        cityId : 27
    },
    {
        name : 'סופר פארם תל מונד',
        address : 'הדקל 47, תל מונד',
        phone : '077-888-1960',
        cityId : 28
    },
]

/*
* Starting the database and creating the tables
*/
var db;
const initDb = async () => {
    try {
        db = await low(adapter);
    } catch(err) {
        throw Error(err);
    }
    db.defaults({ cities: [], pharms: [], updates: [] }).write();
    return db;
};

const setCities = async() => {
    const cities = db.get('cities');
    if(!cities.value().length) { //If cities are empty, fill the table
        for(let i = 0;i < citiesArr.length;i++) {
            cities.push({ id : i, name : citiesArr[i]}).write();
        }
    }
};

const setPharms = () => {
    const pharm = db.get('pharms');
    let date = new Date();
    if(!pharm.value().length) { //If pharms table is empty, then fill it
        for(let i = 0; i < pharms.length; i++) {
            pharm.push({ id : i, name : pharms[i].name, address : pharms[i].address, phone : pharms[i].phone, lastUpdated : date, cityId : pharms[i].cityId, supply : supplyCategories }).write();
        }
    }
};

const setInfrastarcture = async() => {
    await initDb();
    setCities();
    setPharms();
}
setInfrastarcture();