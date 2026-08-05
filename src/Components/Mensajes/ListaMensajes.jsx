import { useTranslation } from "react-i18next";
import "./mensajes.css";

export default function ListaMensajes({ mensajes }) {
    const { t } = useTranslation();

    return (
        <div className="derecha-abajo">
            <div className="lista-mensajes-container">
                <h3>✉ GUESTBOOK / MENSAJES ✉</h3>

                <div className="mensajes-scroll">
                    {mensajes.length === 0 ? (
                        <div className="mensaje-texto" style={{ textAlign: "center", fontStyle: "italic", opacity: 0.7, padding: "10px" }}>
                            {t("noMensajes")}
                        </div>
                    ) : (
                        mensajes.map((msg, i) => (
                            <div key={i} className="mensaje-item">
                                <div className="mensaje-header">
                                    <span className="mensaje-nombre">{msg.nombre}</span>
                                    <span className="mensaje-mail">{msg.mail || "Anónimo"}</span>
                                </div>
                                <div className="mensaje-texto">{msg.mensaje}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
