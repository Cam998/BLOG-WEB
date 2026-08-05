import { useState, useEffect, useCallback } from "react";
import './visorYaoi.css';

export default function VisorYaoi() {
    const imagenes_yaoi = [
        {
            src: '/assets/Images/From Hannibal.jpg',
            titulo: "Hannigram"
        },
        {
            src: '/assets/Images/𝘌𝘪𝘫𝘪 & 𝘈𝘴𝘩 ♥.jpg',
            titulo: "Eiji y Ash"
        },
        {
            src: '/assets/Images/half man.jpg',
            titulo: "Runial"
        },
        {
            src: "/assets/Images/heated rivalry 2.jpg",
            titulo: "Hollánov"
        },
        {
            src: "/assets/Images/lestat y louis 2.jpg",
            titulo: "Loustat"
        },
        {
            src: '/assets/Images/eiji y ash 2.jpg',
            titulo: 'Eiji y Ash'
        },
        {
            src: "/assets/Images/hannibal.jpg",
            titulo: "Hannigram"
        },
        {
            src: "/assets/Images/heated rivalry.jpg",
            titulo: "Hollánov"
        },
        {
            src: "/assets/Images/jamie bell with richard gadd.jpg",
            titulo: "Runial"
        },
        {
            src: "/assets/Images/lestat y louis.jpg",
            titulo: "Loustat"
        }
    ];

    const [indice, setIndice] = useState(0);

    const handleAnterior = useCallback(() => {
        setIndice((prev) => (prev - 1 + imagenes_yaoi.length) % imagenes_yaoi.length);
    }, [imagenes_yaoi.length]);

    const handleSiguiente = useCallback(() => {
        setIndice((prev) => (prev + 1) % imagenes_yaoi.length);
    }, [imagenes_yaoi.length]);

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

    const imagenActual = imagenes_yaoi[indice];

    return (
        <div className="yaoi-container">
            <div className="marco-yaoi" title="Yaoi ❤︎">
                <img key={indice} src={imagenActual.src} alt={imagenActual.titulo} />
            </div>
            <div className="controles-yaoi">
                <button className="yaoi-flecha" onClick={handleAnterior}>◀</button>
                <div className="info-yaoi">
                    <div className="titulo-foto-yaoi">{imagenActual.titulo}</div>
                    <div className="contador-yaoi">{indice + 1} / {imagenes_yaoi.length}</div>
                </div>
                <button className="yaoi-flecha" onClick={handleSiguiente}>▶</button>
            </div>
            <div className="puntos-yaoi">
                {imagenes_yaoi.map((_, i) => (
                    <div
                        key={i}
                        className={`punto-yaoi ${i === indice ? 'activo' : ''}`}
                        onClick={() => setIndice(i)}
                    ></div>
                ))}
            </div>
        </div>
    )
}