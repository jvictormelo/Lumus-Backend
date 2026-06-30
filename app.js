require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');
const path = require('path');
const {syncDatabase} = require('./src/models');

const app = express();

/**
 * Configuração do i18next para internacionalização, carregando arquivos de tradução do diretório 'locales'.
 * Detecta o idioma automaticamente pelo header Accept-Language do navegador.
 */
i18next
.use(Backend)
.use(middleware.LanguageDetector)
.init({
    fallbackLng: 'pt',
    supportedLngs: ['pt', 'en', 'es'],
    backend: {
        loadPath: path.join(__dirname, 'src/locales/{{lng}}/translation.json'),
    },
    detection: {
        order: ['header'],
        caches: [],
    },
});

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173', credentials: true }));
app.use(middleware.handle(i18next));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

const PORT = process.env.PORT || 3000;

app.use('/api', require('./src/routes'))

syncDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Lumus Backend rodando em http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error('Erro ao iniciar o servidor:', error.message);
    process.exit(1);
});