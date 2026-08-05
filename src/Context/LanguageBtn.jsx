import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import "./language.css";

export default function LanguageBtn() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [label, setLabel] = useState("Idioma");
    const containerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    function handleSelect(idioma, codigo) {
        i18n.changeLanguage(codigo);
        setLabel(idioma);
        setIsOpen(false);
    }

    return (
        <div className="language-container" ref={containerRef}>
            <button
                id="dropBtn"
                className="language-btn"
                onClick={() => setIsOpen(prev => !prev)}
            >
                {label}
            </button>
            {isOpen && (
                <div className="menu">
                    <div className="opt" onClick={() => handleSelect("Español", "es")}>
                        Español
                    </div>
                    <div className="opt" onClick={() => handleSelect("English", "en")}>
                        English
                    </div>
                </div>
            )}
        </div>
    );
}