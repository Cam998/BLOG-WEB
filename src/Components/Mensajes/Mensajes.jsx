import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./mensajes.css";

export default function Mensajes({ onAgregar }) {
    const { t } = useTranslation();
    const [nombre, setNombre] = useState("");
    const [mail, setMail] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = () => {
        if (!nombre.trim() || !mensaje.trim()) {
            alert("Por favor completa tu nombre y mensaje 💖");
            return;
        }
        onAgregar({ nombre, mail, mensaje });
        setNombre("");
        setMail("");
        setMensaje("");
    };

    return (
        <div className="mensajes-container">
            <div className="h1-mensajes">
                <h1>{t("mensajeriaTitle")}</h1>
                <h2>{t("mensajeriaDesc")}</h2>
            </div>
            <div className="enviar-mensaje-container">
                <input
                    type="text"
                    placeholder={t("nombrePlaceholder")}
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="text"
                    placeholder={t("mailPlaceholder")}
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder={t("mensajePlaceholder")}
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                />
                <button onClick={handleSubmit}>{t("enviar")}</button>
            </div>
        </div>
    );
}