import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    lng: 'es',
    fallbackLng: 'es',
    interpolation: { escapeValue: false },
    resources: {
        es: {
            translation: {
                bienvenida: "✧Bienvenida a mi página mooor✧",
                descripcion: "｡ ₊°༺❤︎༻°₊ ｡Mi nombre es Camila. Soy de Argentina y soy programadora Full Stack. Aprovecho mis habilidades para volver a los blogs web de los 2000, época que me marca hasta el día de hoy. Cada cosa que contiene esta página es un poco de mi personalidad. Enjoy! ｡ ₊°༺❤︎༻°₊ ｡",

                mensajeriaTitle: "·Oα★MENSAJERÍA  ·Oα★",
                mensajeriaDesc: "Esta sección esta hecha para poder dejar mensajes u opiniones positivas",
                nombrePlaceholder: "Nombre",
                mailPlaceholder: "Mail o user",
                mensajePlaceholder: "Escribir mensaje",
                enviar: "Enviar",
                noMensajes: "No hay mensajes todavía... ¡Dejá el tuyo! 🌸",
                eliminar: "✕",

                linksTitle: "☆★★★★☆LINKS☆★★★★☆",

                quizTitle: "¿Qué personaje de la Nación Argentina sos?",
                quizDesc: "¿Sos una Milky Dolly o un Ricky Fort?",
                quizDesc2: "¡Averigualo!",
                quizBtn: "Click Aquí!!!",

                tablaName: "Camila",
                tablaLevel: "Nivel 5",
                tablaSign: "Aries",

                gustosTitle: "GUSTOS",
                gusto1: "-Música",
                gusto2: "-Videojuegos",
                gusto3: "-Películas",
                gusto4: "-Series",
                gusto5: "-Tejer",
                gusto6: "-Libros",
                gusto7: "-Juegos de mesa",
                gusto8: "-Cocinar",
                gusto9: "-Amigos",
                gusto10: "-Viajar",
                gusto11: "-Twinks",

                disgustosTitle: "DiSGUSTOS",
                disgusto1: "-Días",
                disgusto1b: "nublados/lluvia",
                disgusto2: "-Tener hambre",
                disgusto3: "-Tener sueño",
                disgusto4: "-La IA",
                disgusto5: "-Los hombres",
                disgusto6: "-Los",
                disgusto6b: "imperialistas",
                disgusto7: "-La injusticia",
                disgusto8: "-Ricardo Arjona",
                disgusto9: "-Cristian Castro",
            }
        },
        en: {
            translation: {
                bienvenida: "✧Welcome to my page mooor✧",
                descripcion: "｡ ₊°༺❤︎༻°₊ ｡My name is Camila. I'm from Argentina and I'm a Full Stack developer. I use my skills to bring back the 2000s web blogs, an era that still marks me today. Everything on this page is a little piece of my personality. Enjoy! ｡ ₊°༺❤︎༻°₊ ｡",

                mensajeriaTitle: "·Oα★MESSAGES  ·Oα★",
                mensajeriaDesc: "This section is for leaving positive messages or opinions",
                nombrePlaceholder: "Name",
                mailPlaceholder: "Email or user",
                mensajePlaceholder: "Write a message",
                enviar: "Send",
                noMensajes: "No messages yet... Leave yours! 🌸",
                eliminar: "✕",

                linksTitle: "☆★★★★☆LINKS☆★★★★☆",

                quizTitle: "Which Argentine character are you?",
                quizDesc: "Are you a Milky Dolly or a Ricky Fort?",
                quizDesc2: "Find out!",
                quizBtn: "Click Here!!!",

                tablaName: "Camila",
                tablaLevel: "Level 5",
                tablaSign: "Aries",

                gustosTitle: "LIKES",
                gusto1: "-Music",
                gusto2: "-Video games",
                gusto3: "-Movies",
                gusto4: "-Series",
                gusto5: "-Knitting",
                gusto6: "-Books",
                gusto7: "-Board games",
                gusto8: "-Cooking",
                gusto9: "-Friends",
                gusto10: "-Traveling",
                gusto11: "-Twinks",

                disgustosTitle: "DiSLIKES",
                disgusto1: "-Cloudy",
                disgusto1b: "rainy days",
                disgusto2: "-Being hungry",
                disgusto3: "-Being sleepy",
                disgusto4: "-AI",
                disgusto5: "-Men",
                disgusto6: "-The",
                disgusto6b: "imperialists",
                disgusto7: "-Injustice",
                disgusto8: "-Ricardo Arjona",
                disgusto9: "-Cristian Castro",
            }
        }
    }
});

export default i18n;