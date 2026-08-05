import { useState, useEffect } from 'react';
import './homeScreen.css';
import { Link } from 'react-router';
import Avatar from '../../Components/Avatar/Avatar';
import Reproductor from '../../Components/Reproductor/Reproductor';
import Visor from '../../Components/Visor/Visor';
import Presentacion from '../../Components/Presentacion/Presentacion';
import Tabla from '../../Components/Tabla/Tabla';
import Links from '../../Components/Links/Links';
import Mensajes from '../../Components/Mensajes/Mensajes';
import ListaMensajes from '../../Components/Mensajes/ListaMensajes';
import VisorYaoi from '../../Components/VisorYaoi/VisorYaoi';
import Altar from '../../Components/Altar/Altar';
import Quiz from '../../Components/Quiz/Quiz';
import LanguageBtn from '../../Context/LanguageBtn';


export default function HomeScreen() {
    const [listaMensajes, setListaMensajes] = useState(() => {
        const guardados = localStorage.getItem("blog_mensajes_aprobados");
        return guardados ? JSON.parse(guardados) : [];
    });

    const [mensajesPendientes, setMensajesPendientes] = useState(() => {
        const guardados = localStorage.getItem("blog_mensajes_pendientes");
        return guardados ? JSON.parse(guardados) : [];
    });

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        localStorage.setItem("blog_mensajes_aprobados", JSON.stringify(listaMensajes));
    }, [listaMensajes]);

    useEffect(() => {
        localStorage.setItem("blog_mensajes_pendientes", JSON.stringify(mensajesPendientes));
    }, [mensajesPendientes]);

    const agregarMensaje = (nuevoMensaje) => {
        setMensajesPendientes((prev) => [...prev, nuevoMensaje]);
        setShowModal(true);
    };

    return (
        <>
            <LanguageBtn />
            <div className='main-container'>
                <div className='izquierda-seccion'>
                    <div className='fila-componentes'>
                        <div className='avatar-container'>
                            <Avatar />
                        </div>
                        <div className='derecha-columna'>
                            <div>
                                <Reproductor />
                            </div>
                            <div className='visor-wrapper'>
                                <Visor />
                            </div>
                        </div>
                    </div>
                    <div className="presentacion-mobile">
                        <Presentacion />
                    </div>
                    <div className='links-wrapper'>
                        <Links />
                    </div>
                    <div className='mensajes-wrapper'>
                        <Mensajes onAgregar={agregarMensaje} />
                    </div>
                    <div className="perro-y-quiz-wrapper">
                        <div className="perro-video">
                            <Link to="/sandro">
                                <video
                                    src="/assets/Images/estrella-animacion.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="estrella-animacion"
                                    width={200}
                                    title="Sandro Jamón 𓃠"
                                />
                            </Link>
                        </div>
                        <Link to={"/quiz"} className="quiz-link">
                            <Quiz />
                        </Link>
                    </div>
                </div>
                <div className='columna-presentacion'>
                    <div className='presentacion-wrapper'>
                        <Presentacion />
                    </div>
                    <div className='tabla-wrapper'>
                        <Tabla />
                    </div>
                    <div className='lista-mensajes-wrapper'>
                        <ListaMensajes mensajes={listaMensajes} />
                    </div>
                    <div className="visor-yaoi-lista">
                        <VisorYaoi />
                        <Altar />
                    </div>
                </div>
            </div>
            <div className="admin-footer-link" style={{ textAlign: 'center', marginTop: '-4.5vh', marginBottom: '4vh' }}>
                <Link to="/moderacion" style={{ fontSize: '11px', color: '#ff92de', textDecoration: 'none', opacity: 0.6, fontFamily: "'Courier Prime', monospace" }}>
                    🗝 Moderación
                </Link>
            </div>
            {showModal && (
                <div className="custom-modal-overlay">
                    <div className="custom-modal-card">
                        <h3>💌 MENSAJE ENVIADO 💌</h3>
                        <p>¡Mensaje enviado con éxito! 💖 Estará visible tan pronto como el administrador lo apruebe.</p>
                        <button onClick={() => setShowModal(false)}>Aceptar</button>
                    </div>
                </div>
            )}
        </>
    )
}