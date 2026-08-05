import { useTranslation } from "react-i18next";
import "./presentacion.css";

export default function Presentacion() {
    const { t } = useTranslation();
    return (
        <div className="present-container">
            <div className="presentacion">
                <h1>{t("bienvenida")}</h1>
            </div>
            <div className="texto">
                <h2>{t("descripcion")}</h2>
            </div>
        </div>
    )
}


