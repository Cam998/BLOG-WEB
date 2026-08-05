import { useTranslation } from "react-i18next";
import "./tabla.css";

export default function Tabla() {
    const { t } = useTranslation();
    return (
        <div className="tabla-container">
            <div className="tabla-window">
                <header className="tabla-header">
                    <span className="tabla-title">CONOCEME</span>
                    <div className="tabla-controls">
                        <button className="tabla-control-btn btn-minimize" aria-label="Minimizar">-</button>
                        <button className="tabla-control-btn btn-maximize" aria-label="Maximizar">□</button>
                        <button className="tabla-control-btn btn-close" aria-label="Cerrar">x</button>
                    </div>
                </header>

                <div className="tabla-body">
                    <div className="tabla-row-top">
                        <div className="tabla-pixel-box box-name">
                            <span>{t("tablaName")}</span>
                        </div>

                        <div className="tabla-flag" title="Argentina">
                            <div className="flag-stripe blue"></div>
                            <div className="flag-stripe white">
                                <div className="flag-sun"></div>
                            </div>
                            <div className="flag-stripe blue"></div>
                        </div>

                        <div className="tabla-pixel-box box-level">
                            <span>{t("tablaLevel")}</span>
                        </div>
                    </div>

                    <div className="tabla-row-bottom">
                        <div className="aries-container">
                            <div className="tabla-pixel-box box-aries">
                                <span className="aries-text">{t("tablaSign")}</span>
                                <div className="aries-divider"></div>
                                <span className="aries-symbol"><img src="/assets/Images/signo-de-aries.png" alt="aries" width={25} /></span>
                            </div>
                        </div>

                        <div className="video-container-box">
                            <video
                                src="/assets/Images/corazones cortado.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto"
                                className="tabla-video"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="tabla-gustos-disgustos">
                <div className="list-window">
                    <header className="list-window-header">
                        <div className="list-window-title-container">
                            <span className="list-window-icon-gustos">✓</span>
                            <span className="list-window-title">{t("gustosTitle")}</span>
                        </div>
                    </header>
                    <div className="list-window-body">
                        <div>{t("gusto1")}</div>
                        <div>{t("gusto2")}</div>
                        <div>{t("gusto3")}</div>
                        <div>{t("gusto4")}</div>
                        <div>{t("gusto5")}</div>
                        <div>{t("gusto6")}</div>
                        <div>{t("gusto7")}</div>
                        <div>{t("gusto8")}</div>
                        <div>{t("gusto9")}</div>
                        <div>{t("gusto10")}</div>
                        <div>{t("gusto11")}</div>
                    </div>
                </div>

                <div className="list-window">
                    <header className="list-window-header">
                        <div className="list-window-title-container">
                            <span className="list-window-icon-disgustos">X</span>
                            <span className="list-window-title">{t("disgustosTitle")}</span>
                        </div>
                    </header>
                    <div className="list-window-body">
                        <div>{t("disgusto1")}</div>
                        <div className="list-indent">{t("disgusto1b")}</div>
                        <div>{t("disgusto2")}</div>
                        <div>{t("disgusto3")}</div>
                        <div>{t("disgusto4")}</div>
                        <div>{t("disgusto5")}</div>
                        <div>{t("disgusto6")}</div>
                        <div className="list-indent">{t("disgusto6b")}</div>
                        <div>{t("disgusto7")}</div>
                        <div>{t("disgusto8")}</div>
                        <div>{t("disgusto9")}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}