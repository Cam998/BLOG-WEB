import { useState, useEffect } from "react";
import './altar.css';

export default function Altar() {
    const [spriteSrc, setSpriteSrc] = useState(null);
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        fetch("/assets/Images/Altar chavela.piskel")
            .then(res => res.json())
            .then(data => {
                const layerData = JSON.parse(data.piskel.layers[0]);
                const base64 = layerData.chunks[0].base64PNG;
                setSpriteSrc(base64);
            })
            .catch(err => console.error("Error loading piskel:", err));
    }, []);

    useEffect(() => {
        if (!spriteSrc) return;
        const interval = setInterval(() => {
            setFrame(prev => (prev + 1) % 3);
        }, 200); 
        return () => clearInterval(interval);
    }, [spriteSrc]);

    if (!spriteSrc) {
        return <div className="altar-placeholder" />;
    }

    return (
        <div className="altar-container">
            <div className="altar-chavela" title="Chavela Batman 𓃠">
                <div
                    className="altar-chavela-sprite"
                    style={{
                        width: '200px',
                        height: '200px',
                        backgroundImage: `url(${spriteSrc})`,
                        backgroundPosition: `-${frame * 200}px 0px`,
                        backgroundSize: '600px 200px',
                        backgroundRepeat: 'no-repeat',
                        imageRendering: 'pixelated'
                    }}
                />
            </div>
        </div>
    );
}
