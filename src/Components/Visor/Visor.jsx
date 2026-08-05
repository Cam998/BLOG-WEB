import { useState, useEffect, useCallback } from "react";
import "./visor.css";

export default function Visor() {
    const imagenes = [
        {
            src: '/assets/Images/american mary.jpg',
            titulo: "American Mary"
        },
        {
            src: '/assets/Images/Crash_ Drivers Side.jpg',
            titulo: "Crash"
        },
        {
            src: '/assets/Images/craft.jpg',
            titulo: "The Craft"
        },
        {
            src: '/assets/Images/Saw III.jpg',
            titulo: "Saw"
        },
        {
            src: '/assets/Images/Donnie Darko.jpg',
            titulo: "Donnie Darko"
        },
        {
            src: '/assets/Images/maggie gyllenhaal in secretary (2002).jpg',
            titulo: "Secretary"

        },
        {
            src: '/assets/Images/The Silence of the Lambs (1991) Jonathan Demme Director.jpg',
            titulo: "TSOTL"
        },
        {
            src: '/assets/Images/May.jpg',
            titulo: "May"
        },
        {
            src: '/assets/Images/leatherface.jpg',
            titulo: "TCTM"
        },
        {
            src: '/assets/Images/descarga (8).jpg',
            titulo: "Ghost World"
        },
        {
            src: '/assets/Images/Mysterious Skin.jpg',
            titulo: "Mysterious Skin"
        },
        {
            src: '/assets/Images/the doom generation.jpg',
            titulo: "TDG"
        },
    ];

    const [indice, setIndice] = useState(0);

    const handleAnterior = useCallback(() => {
        setIndice((prev) => (prev - 1 + imagenes.length) % imagenes.length);
    }, [imagenes.length]);

    const handleSiguiente = useCallback(() => {
        setIndice((prev) => (prev + 1) % imagenes.length);
    }, [imagenes.length]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                handleAnterior();
            } else if (e.key === 'ArrowRight') {
                handleSiguiente();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleAnterior, handleSiguiente]);


    const imagenActual = imagenes[indice];

    return (
        <div className="visor-container">
            <a href="https://boxd.it/2ih6v" target="_blank" rel="noopener noreferrer" style={{ display: "block", width: "100%", textDecoration: "none", cursor: "pointer" }}>
                <div className="marco" title="Mi Letterboxd ᯓ★">
                    <img key={indice} src={imagenActual.src} alt={imagenActual.titulo} />
                </div>
            </a>

            <div className="controles-visor">
                <button className="btn-flecha" onClick={handleAnterior}>◀</button>
                <div className="info">
                    <div className="titulo-foto">{imagenActual.titulo}</div>
                    <div className="contador">{indice + 1} / {imagenes.length}</div>
                </div>
                <button className="btn-flecha" onClick={handleSiguiente}>▶</button>
            </div>

            <div className="puntos">
                {imagenes.map((_, i) => (
                    <div
                        key={i}
                        className={`punto ${i === indice ? 'activo' : ''}`}
                        onClick={() => setIndice(i)}
                    ></div>
                ))}
            </div>
        </div>
    );
}