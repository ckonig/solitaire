import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
    en: {
        translation: {
            menu: {
                singleplayer: "Single Player",
            },
            resume: "Resume",
            "Welcome to React": "Welcome to React and react-i18next",
        },
    },
    fr: {
        translation: {
            menu: {
                singleplayer: "Jouer seul",
            },
            resume: "Continuer",
            "Welcome to React": "Bienvenue à React et react-i18next",
        },
    },
    de: {
        translation: {
            menu: {
                singleplayer: "Einzelspieler",
            },
            resume: "Weiter",
            "Welcome to React": "Welcome to React and react-i18next",
        },
    },
    nl: {
        translation: {
            menu: {
                singleplayer: "Met je eentje",
            },
            resume: "Verder",
            "Welcome to React": "Welcome to React and react-i18next",
        },
    },
};

i18n.use(detector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",

        //keySeparator: true, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
