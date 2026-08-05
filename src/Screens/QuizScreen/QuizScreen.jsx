import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './quizScreen.css';

const QUESTIONS = [
    {
        text: "¿Cómo sería tu pareja ideal?",
        options: [
            { text: "Fisura, medio drogadicto y/o medio desalineado.", type: "milky" },
            { text: "Galán. Empresario del arte escenico. De los que huelen a whisky.", type: "carmen" },
            { text: "Twink. De los que no sabés si querés terminar de criar o besar.", type: "guido" },
            { text: "Músico. Es gato, pero bancarías una relación abierta.", type: "marixa" },
            { text: "Mujeres rubias y hechas. De las que te abandonan pero siempre vuelven porque te la pasas llorando en vivo.", type: "ricardo" }
        ]
    },
    {
        text: "Actividad preferida",
        options: [
            { text: "Fiestas menemistas en la playa.", type: "ricky" },
            { text: "Hacerme limpieza profunda de colon.", type: "guido" },
            { text: "Stanear a mi idola en redes compulsivamente 24/7.", type: "mariano" },
            { text: "Disfrutar de la naturaleza. Abrazar árboles.", type: "anto" },
            { text: "Salir a robar casas.", type: "more" }
        ]
    },
    {
        text: "¿Cómo te definirían las personas que te conocen?",
        options: [
            { text: "Resentida. Te encanta mandar carta documento.", type: "oriana" },
            { text: "Te peleas hasta por la abuela muerta del que te insulta.", type: "moria" },
            { text: "Enamoradiza. Pelearías por tu hombre aunque pasen 60 años.", type: "silvia" },
            { text: "Católica no practicante. Pedís rezar en ronda y te confundís 15 veces los versos del Padre Nuestro.", type: "georgina" },
            { text: "Conventillero. Pedís que averiguen y mandas al frente a los gritos al involucrado en vivo.", type: "ventura" }
        ]
    },
    {
        text: "¿Qué preferirías comer?",
        options: [
            { text: "Unos sorrentinos de salmón. Los pedís por delivery y no tienen así que pedis una carne al horno con papas.", type: "oriana" },
            { text: "Sanguchitos de paleta pero no es paleta. Ha de ser japaleta. Acompañados de sidra caliente.", type: "moria" },
            { text: "Nada. Pero después puede que no te sientas un poco bien y necesites una Coca-Cola.", type: "carmen" },
            { text: "Pollo al horno con papas. Te hace acordar a tu mamá.", type: "guido" },
            { text: "Patys. Los preferís antes que al pescado que es lo único que hay.", type: "andrea" }
        ]
    },
    {
        text: "Tu mejor vestimenta y/o accesorio",
        options: [
            { text: "No me importa qué ropa usar pero tengo que tener unas uñas muy largas de mujerch.", type: "milky" },
            { text: "Saco de piel y si es rojo mejor, contra la envidia.", type: "ricky" },
            { text: "Un corte europeo de pelo que se viene para acá y si tengo los ojos rojos mejor.", type: "silvia" },
            { text: "No me puede faltar la vincha con el nombre de mi idola. Sirve para secarse las lágrimas de emoción.", type: "mariano" },
            { text: "Traje y corbata siempre. Lágrimas como accesorio.", type: "ricardo" }
        ]
    },
    {
        text: "Tu reacción cuando te hacen enojar",
        options: [
            { text: "Quedás pasmada porque te parecen un horror ella y toda su producción. Abandonás el móvil.", type: "oriana" },
            { text: "Lo burlás porque se maquilla mal y encima sesea. Lo imitás.", type: "ricky" },
            { text: "Fingís que esta todo bien hasta que te hartás y preguntás si te están retando. Abandonás el móvil.", type: "carmen" },
            { text: "Empezás a insultar. Te dice que se parece a Ariana Grande pero a vos te parece que es Adrián el albañil.", type: "anto" },
            { text: "Te querés ir a las piñas. Te dijeron drogradicta y vos le decís cornuda y que le vas a romper el orto.", type: "andrea" }
        ]
    },
    {
        text: "Cosas que te hacen llorar",
        options: [
            { text: "Que te vaya mal en todo. Encima te cerraron el Instagram y se murió tu gato. Necesitás vino y escuchar Lana del Rey.", type: "milky" },
            { text: "La gente irrespetuosa y sin vergüenza. Querés ir a un corte porque llorás por tu hija y a la vuelta vas a seguir con más mierda para todos por mentirosos.", type: "moria" },
            { text: "Que mi papá no me haya mirado a los ojos como el papá de Cinthia Fernández a ella.", type: "silvia" },
            { text: "Que te critiquen y te pongan una mala puntuación. Vos le pediste por favor que se fije lo que te iba a poner.", type: "mariano" },
            { text: "Tener que hablarle a un hacker en vivo porque amenaza con filtrar tus fotos íntimas.", type: "andrea" }
        ]
    },
    {
        text: "Frase:",
        options: [
            { text: "Yo soy de la CIA y del FBI. Tengo mucha data", type: "anto" },
            { text: "Yo me siento sumamente envidiada. Pero bueno, a veces el éxito no se puede tapar", type: "marixa" },
            { text: "Las veces que me decías en silencio...te quiero", type: "ricardo" },
            { text: "Es una guarangada. Estamos con Micho, Tito. No, no hay cabezón", type: "georgina" },
            { text: "Sexo esporádico. Un sexo ofrecido al que yo fui permeable", type: "ventura" },
            { text: "Que lo demuestre", type: "more" }
        ]
    },
    {
        text: "Emprendimiento",
        options: [
            { text: "Entraderas.", type: "more" },
            { text: "Arruinarle la vida a las personas.", type: "ventura" },
            { text: "Actuar de madre villera.", type: "georgina" },
            { text: "Vender zapatos en 11.", type: "marixa" }
        ]
    }

];

const RESULTS = {
    ricky: {
        name: "Ricardo Fort (El Comandante)",
        description: "Sos puro lujo a todo culo. Te encantan las cipayadas porque sos el menemismo hecho persona pero en realidad sos kirchnerista. Tenés un secreto que tapás con otras personas, aunque es a voces. Sos más de los Rolls Royce. Twitter es tu lugar. Tus artistas preferidos son Lady Gaga y Pitbull.",
        image: "/assets/Images/ricky.avif"
    },
    milky: {
        name: "Milky Dolly",
        description: "Sos camp. Le das a todo lo que venga. Aprecias los estupefacientes. Si te llaman de un reality estás. Odias a los libertarios. Solés pelearte con tus amigas por el show.",
        image: "/assets/Images/MILKY.avif"
    },
    moria: {
        name: "Moria Casán (La One)",
        description: "Lengua karateka. Disfrutás discutir porque además tenés un ego enorme que se alimenta de ello. No te gustan las cosas berretas. Seguramente usas peluca. No te gustan los de afuera.",
        image: "/assets/Images/moria.avif"
    },
    oriana: {
        name: "Oriana Junco",
        description: "No te gusta que te jodan. Estas muy bien asesorada legalmente y lo utilizás a tu favor cada vez que podés. No entendés de qué viven algunos. Te operás y después escrachás a los doctores. No te gusta en la cola.",
        image: "/assets/Images/oriana.avif"
    },
    carmen: {
        name: "Carmen Barbieri",
        description: "Simpática. Por lo general, no hablás inglés pero lo intentás. Tenés un hijo varón que defendés con uñas y dientes aunque sea un forro. Perdonás infidelidades y lo cuidás moribundo.",
        image: "/assets/Images/carmen.webp"
    },
    silvia: {
        name: "Silvia Suller",
        description: "Sos extravagante, un personaje. Tuviste mil vidas en una (mil amores más bien). Saliste con un tal Aldo el asesino según el libro que publicaste. No te llevás bien con tu familia, con nadie. Seguís enamorada del padre de tu único hijo aunque la madre de este te haga brujería. La Rímolo tu peor enemiga.",
        image: "/assets/Images/la suller.jpg"
    },
    guido: {
        name: "Guido Suller",
        description: "Sos la definición de trolo dosmilero. Te encanta el conventillo falso. Odiás a Oriana Junco; te parece el hipopótamo de Pumper Nic. Tenés una cabellera rubia impresionante. Sos multifacético. Te gustan los jóvenes. Vas y venís con tu hermana.",
        image: "/assets/Images/guido.png"
    },
    mariano: {
        name: "Mariano De La Canal",
        description: "Trabajás de ser fan a tiempo completo. Conociste a tu mejor amigo en un atraco de rebajas. Muy sentimental. Hacés presencias en pancherías.",
        image: "/assets/Images/mariano.jpg"
    },
    anto: {
        name: "Anto Pane",
        description: "Sos reventada pero sos buena. A veces te amás, otras no querés ni mirarte al espejo. Vivís en una fantasía constante. Conventillera como otras. Si podés te movés a todo lo que se mueve. Solés citar a Eva Perón.",
        image: "/assets/Images/anto.webp"
    },
    andrea: {
        name: "Andrea Rincón",
        description: "De carácter fuerte, ariana. Buen corazón. Ex drogadicta que encontró a dios, o bueno, evangelistas. Te bautizaste en una pelopincho. Tu ex es músico y te dedicó un temazo. Saliste de Gran Hermano y dentro del reality te peleaste con Floppy Tesouro. Bisexual.",
        image: "/assets/Images/andrea.png"
    },
    marixa: {
        name: "Marixa Balli",
        description: "Bailarina tropical. Morocha putón argentino. Humilde y trabajadora. Enamorada por siempre del mismo tipo y negadora serial de ser la segunda. Intentaste pero odiás ser panelista de chimentos. Te envidian mucho. Todo Xurama y la Cachaca, porque además de vender zapatos tenés un disco.",
        image: "/assets/Images/marixa.webp"
    },
    ricardo: {
        name: "Ricardo García",
        description: "De nicho. Solo los reales te conocen. Vivís emputecido con la misma mujer y la llorás en todos los canales. Te peleaste con varias mujeres trans. Sos muy violento. Nadie te banca. Parece que jamás usaste un lavarropa para ese traje.",
        image: "/assets/Images/ricardo garcia.jpg"
    },
    georgina: {
        name: "Georgina Barbarossa",
        description: "Fiel devota pero no practicante. Sufriste varias tragedias en la vida pero la seguís peleando. Cada tanto actuás pero los chimentos son más fuertes. Te peleaste con una amiga y se tiraron mierda en vivo por 20 años.",
        image: "/assets/Images/georgina.jpg"
    },
    ventura: {
        name: "Luis Ventura",
        description: "La sombra de otro siempre. Cagaste hasta a tu mejor amigo. Hiciste que una persona perdiera situaciones legales y le arruinaste la vida. Hiciste abortar a una amante y lo negás. Sos un hijo de puta. Nadie te quiere. En pandemia hacías Zoom para seguir chismeando.",
        image: "/assets/Images/ventura.jpg"
    },
    more: {
        name: "More Rial",
        description: "Reemplazaste a tu papá en popularidad. Sos inimputable (más o menos). Terminaste presa por robar con tu hijo recién nacido en el auto. Daddy issues a full. Adoptada pero a qué costo (el de Jorge Rial). Tenés las pestañas como un abanico.",
        image: "/assets/Images/more.jpg"
    }
};

export default function QuizScreen() {
    const navigate = useNavigate();
    const [started, setStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [scores, setScores] = useState({});
    const [result, setResult] = useState(null);
    const audioRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (audioRef.current) {
            audioRef.current.play().catch(err => {
                console.log("Autoplay blocked on mount:", err);
            });
        }
    }, []);

    const handleAnswer = (type) => {
        const newScores = { ...scores, [type]: (scores[type] || 0) + 1 };
        setScores(newScores);

        if (currentQuestion + 1 < QUESTIONS.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Calculate result
            let maxType = "";
            let maxScore = -1;
            for (const key in newScores) {
                if (newScores[key] > maxScore) {
                    maxScore = newScores[key];
                    maxType = key;
                }
            }
            setResult(maxType);
        }
    };

    const handleRestart = () => {
        setStarted(false);
        setCurrentQuestion(0);
        setScores({});
        setResult(null);
    };

    const renderContent = () => {
        if (!started) {
            return (
                <div className="quiz-screen-start-container">
                    <button className="btn-volver" onClick={() => navigate("/home")}>
                        ← Volver al Blog
                    </button>
                    <button className="btn-comenzar-quiz" onClick={() => {
                        setStarted(true);
                        if (audioRef.current) {
                            audioRef.current.play().catch(err => console.log("Audio play failed on start:", err));
                        }
                    }}>
                        Comenzar Quiz
                    </button>
                </div>
            );
        }

        if (result) {
            const character = RESULTS[result];
            return (
                <div className="quiz-screen-container">
                    <button className="btn-volver" onClick={() => navigate("/home")}>
                        ← Volver al Blog
                    </button>
                    <div className="result-card">
                        <h2>Tu resultado es:</h2>
                        <h1>{character.name}</h1>
                        <p className="result-description">{character.description}</p>
                        <img src={character.image} alt={character.name} className="result-image" />
                        <button className="btn-reiniciar-quiz" onClick={handleRestart}>
                            Hacer el quiz de nuevo
                        </button>
                    </div>
                </div>
            );
        }

        const question = QUESTIONS[currentQuestion];

        return (
            <div className="quiz-screen-container">
                <button className="btn-volver" onClick={() => navigate("/home")}>
                    ← Volver al Blog
                </button>
                <div className="quiz-progress">
                    ⋆☕︎ ˖Pregunta {currentQuestion + 1} de {QUESTIONS.length} ⋆☕︎ ˖
                </div>
                <div className="question-card">
                    <h2>๋࣭ ⭑{question.text}๋࣭ ⭑</h2>
                    <div className="options-container">
                        {question.options.map((option, idx) => (
                            <button
                                key={idx}
                                className="btn-option"
                                onClick={() => handleAnswer(option.type)}
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {renderContent()}
            <audio ref={audioRef} src="/assets/Audio/showmatch.mp3" autoPlay loop />
        </>
    );
}