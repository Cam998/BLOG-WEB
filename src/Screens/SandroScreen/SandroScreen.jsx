import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import "./sandroScreen.css";

const FOTOS = [
    "/assets/Images/PXL_20250910_162458351.jpg",
    "/assets/Images/PXL_20260104_153651493.jpg",
    "/assets/Images/PXL_20260331_214940362.jpg",
    "/assets/Images/PXL_20260405_145138793.jpg",
    "/assets/Images/S1.jpg",
    "/assets/Images/S2.jpg",
    "/assets/Images/S3.jpg",
    "/assets/Images/S4.jpg",
    "/assets/Images/S5.jpg",
    "/assets/Images/S6.jpg",
    "/assets/Images/S7.jpg",
    "/assets/Images/S8.jpg",
    "/assets/Images/S9.jpg",
    "/assets/Images/S10.jpg",
    "/assets/Images/PXL_20260405_145140818.jpg"
];

const TIEMPO_ENTRE_FOTOS = 850;

export default function SandroScreen() {
    const navigate = useNavigate();
    const [visibleCount, setVisibleCount] = useState(0);
    const timeoutIds = useRef([]);
    const audioRef = useRef(null);

    const iniciarAnimacion = () => {
        timeoutIds.current.forEach(clearTimeout);
        timeoutIds.current = [];
        setVisibleCount(0);

        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(err => console.log("Reproducción de audio pospuesta:", err));
        }

        for (let i = 1; i <= FOTOS.length; i++) {
            const id = setTimeout(() => {
                setVisibleCount(i);
            }, i * TIEMPO_ENTRE_FOTOS);
            timeoutIds.current.push(id);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        document.body.style.overflow = "hidden";

        const mountTimer = setTimeout(() => {
            iniciarAnimacion();
        }, 0);

        return () => {
            clearTimeout(mountTimer);
            timeoutIds.current.forEach(clearTimeout);
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <>
            <div className="sandro-main-container">
                <button className="btn-volver" onClick={() => navigate("/home")}>
                    ← Volver al Blog
                </button>
                <h1>SANDRO JAMÓN</h1>
                <div className="sandro-galeria" id="pila">
                    {FOTOS.map((src, i) => {
                        const isVisible = i < visibleCount;
                        return (
                            <img
                                key={src}
                                src={src}
                                alt={`fotos de sandro jamón ${i + 1}`}
                                className={`foto ${isVisible ? "visible" : ""}`}
                                style={{
                                    zIndex: i,
                                    transform: isVisible
                                        ? "scale(1)"
                                        : "scale(0.5)",
                                    opacity: isVisible ? 1 : 0
                                }}
                            />
                        );
                    })}
                    <audio ref={audioRef} src="/assets/Audio/miranda-traicion.mp3" autoPlay />
                </div>
                <button className="btn-reiniciar" id="reiniciar" onClick={iniciarAnimacion}>
                    Reiniciar
                </button>
            </div>
            <span className="cancion-id">
                <img src="/assets/Images/casete.png" alt="casete" width={20} /> Traición - Miranda
            </span>
        </>
    );
}