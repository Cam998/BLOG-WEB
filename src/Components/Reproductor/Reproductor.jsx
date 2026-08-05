import { useState, useEffect, useRef } from "react";
import "./reproductor.css";

export default function Reproductor() {
    const canciones = [
        {
            titulo: "Double Bass",
            artista: "Gorillaz",
            src: "/assets/Audio/Double Bass.mp3"
        },
        {
            titulo: "Conspiracy",
            artista: "Paramore",
            src: "/assets/Audio/Conspiracy.mp3"
        },
        {
            titulo: "Got the Life",
            artista: "Korn",
            src: "/assets/Audio/Got the Life.mp3"
        },
        {
            titulo: "Livin'It Up",
            artista: "Limp Biskit",
            src: "/assets/Audio/Livin' It Up.mp3"
        },
        {
            titulo: "Taste in Men",
            artista: "Placebo",
            src: "/assets/Audio/Taste In Men.mp3"
        },
        {
            titulo: "The Perfect Drug",
            artista: "NIN",
            src: "/assets/Audio/The Perfect Drug.mp3"
        },
        {
            titulo: "With You",
            artista: "Linkin Park",
            src: "/assets/Audio/With You.mp3"
        }
    ];

    const [indiceActual, setIndiceActual] = useState(0);
    const [sonando, setSonando] = useState(false);
    const [tiempo, setTiempo] = useState(0);
    const [duracionTotal, setDuracionTotal] = useState(0);

    const audioRef = useRef(null);
    const isFirstRender = useRef(true);
    const sonandoRef = useRef(sonando);

    useEffect(() => {
        sonandoRef.current = sonando;
    }, [sonando]);

    const formatTime = (segundos) => {
        if (isNaN(segundos)) return "0:00";
        const min = Math.floor(segundos / 60);
        const seg = Math.floor(segundos % 60).toString().padStart(2, '0');
        return `${min}:${seg}`;
    };

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (sonando) {
            audioRef.current.pause();
            setSonando(false);
        } else {
            audioRef.current.play().then(() => {
                setSonando(true);
            }).catch(err => {
                console.log("Error al reproducir audio:", err);
            });
        }
    };

    const handlePrev = () => {
        const nuevoIndice = (indiceActual - 1 + canciones.length) % canciones.length;
        setIndiceActual(nuevoIndice);
    };

    const handleNext = () => {
        const nuevoIndice = (indiceActual + 1) % canciones.length;
        setIndiceActual(nuevoIndice);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setTiempo(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuracionTotal(audioRef.current.duration);
        }
    };

    const handleEnded = () => {
        handleNext();
    };

    const handleProgressBarClick = (e) => {
        if (audioRef.current && duracionTotal) {
            const rect = e.currentTarget.getBoundingClientRect();
            const porcentaje = (e.clientX - rect.left) / rect.width;
            audioRef.current.currentTime = porcentaje * duracionTotal;
        }
    };

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (audioRef.current) {
            audioRef.current.load();
            if (sonandoRef.current) {
                audioRef.current.play().catch(err => {
                    console.log("Error al reproducir tras cambiar canción:", err);
                });
            }
        }
    }, [indiceActual]);



    return (
        <div className="reproductor-container">
            <audio
                ref={audioRef}
                src={canciones[indiceActual].src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
            />

            <div className="pantalla">
                <video src="/assets/Images/animacion-mejorada.mp4" loop muted autoPlay playsInline className="pantalla-video" alt="animacion de ojos" />
                <div className="track-titulo">
                    <span key={indiceActual} id="track-titulo">
                        {canciones[indiceActual].titulo}
                    </span>
                </div>
                <div className="track-artista" id="trackArtista">
                    {canciones[indiceActual].artista}
                </div>
                <div className={`eq ${sonando ? "playing" : ""}`} id="eq">
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
            </div>

            <div className="controles">
                <div className="btn" id="prevBtn" onClick={handlePrev}></div>
                <div className={`btn play ${sonando ? "playing" : ""}`} id="playBtn" onClick={togglePlay}></div>
                <div className="btn" id="nextBtn" onClick={handleNext}></div>
            </div>

            <div className="linea-progreso">
                <span id="tiempoActual">{formatTime(tiempo)}</span>
                <div className="barra-progreso" id="barraProgreso" onClick={handleProgressBarClick}>
                    <div className="llenado-progreso" id="llenadoProgreso" style={{ width: `${(tiempo / duracionTotal) * 100 || 0}%` }}></div>
                </div>
                <span id="duracion">{formatTime(duracionTotal)}</span>
            </div>
        </div>
    );
}