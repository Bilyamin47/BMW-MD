const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU1ByZTFqcGRmMkhyZXlPUFVGRExKQXoxUnE0d0R3Nkxza0VCSlgybHJWZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZnYrNDg0OE1OdzdLZDRKcHV1MFFneWxLdGMvUEkyTWNSKzJ5dHovTXRpdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpSmN1QjBTYWJaYXdRVkxOUXc5ZlRtMGtTRWZoRkJSME9xNTFJdkNpU0VBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvSi9Wd01WTElORXI1ME1IUGR4OTBhc0l6NmxZZkdOV3M5S3R5UkpyaDNVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVLeEg2M2p1NXkrVStjYU9xMGh6ajNFWTRVSVMrTzI2aHR4VzFUcHZHa1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpzeWN4eDB6UTJkUm1SN2F0K0E2d3YwTENvREFBMVBnc21nb2F1VW9rQUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEFtRFFaeGlxaTNnMzBYK2VNYkhFNWRJSmw0QnJkckN5S1pOTU9ZTUNYTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUGY0QyttOHZNcVRzcHVoTzIrNk5JblFDek5id1hrenJOOU9pMTMydUdtWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNnNlFiekJxZ2lQc21xVmRpYy9IRHVpaFVXUDB6UVZia08rc1BYQjNmcE4zVHV1dHZRYmkrN0RHMWN4Rml2bjIrSjJ5NEh6WmpadU91S1U1NUtvR0FnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ4LCJhZHZTZWNyZXRLZXkiOiJTOHNRUW5mUnAwRmZKUFhybzZRYVJhdEJCckZTUDQyc3gvaGtYUzdYVXdjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTc4OTU4NzQ0OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI0RjM4NzE5ODAzRTIxNjVCMzI4QjRBNzU1N0Q5NEI5QSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzE2OTYyMDcxfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTU3ODk1ODc0NDhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMzBGNEU3QTYyMDc4OUQxNUFGMzM2QzkyODZFNDQ2MDYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcxNjk2MjA3Mn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiUXZNcHhPVURUOE9GbTcyc0FnUUp0USIsInBob25lSWQiOiIxMDk2NmM5Mi1lOTdiLTQ4NjAtYWUzZC0wMjI4MzdiMmI4NTgiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSzJZbE5LME1HSzhmMHZZVEkvMkFtdjJJaWdFPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJqZUpKTXc0L1VSNDFwYWFWUmhsbkd0NXBDWT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJYNUtTVDNWTiIsIm1lIjp7ImlkIjoiMjU1Nzg5NTg3NDQ4OjE2QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdlJLwnZSx8J2UpfCdlKrwnZSe8J2UqyDwnZSF8J2UpvCdlKkg8J2UnPCdlJ7wnZSq8J2UpvCdlKsifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tQTXNwWUdFSWVHMjdJR0dBVWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IitZZmx2OUJCekFWZWhRdlFaV1pUaHNIN2dBcmVqY1hGYlZtRHFKU2o4MDg9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlJ0L3ZvQkhvYW4xY1hHK3BFc1FNRkJjVHJ4MEJxWUVGRkR6Z1NtRlIvYnJjeWF0NVVML1R0dmphajFDZDlNa1R6Y2U2S3dDYndrb0FmbzZmTWFVUkFBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJOcmZ2aExnWktpM01DWW1jWStONlZvWThNMjJDMU9pRnNWa3FQY3BNQkFieTByMEl0S3RLUm5uL1dMd1Q2ZTQzRGR1WDAxRUlnZ0pNM1NxaHBVVUFCZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTc4OTU4NzQ0ODoxNkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJmbUg1Yi9RUWN3RlhvVUwwR1ZtVTRiQis0QUszbzNGeFcxWmc2aVVvL05QIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE2OTYyMDY4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUZNTCJ9',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BMW MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/071f797dda6aef5ae3877.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

