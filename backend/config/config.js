process.env.PORT = process.env.PORT || 5000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB = "";
if (process.env.NODE_ENV === 'dev') {
    urlDB = "mongodb+srv://jonatan:jonatan@cluster0.s2fq5.mongodb.net/App-PcMasterRace?retryWrites=true&w=majority";
}
process.env.URLDB = urlDB;

process.env.CADUCIDAD_TOKEN = '48h';

process.env.TOKEN_SECRET = process.env.TOKEN_SECRET || 'SECRETON';