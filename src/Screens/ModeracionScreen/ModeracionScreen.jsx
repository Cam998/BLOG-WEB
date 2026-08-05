import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./moderacionScreen.css";
import "../HomeScreen/homeScreen.css"; 
import { getMessages, updateMessageStatus, deleteMessage } from "../../Services/database";

export default function ModeracionScreen() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);

    const [pendientes, setPendientes] = useState([]);
    const [aprobados, setAprobados] = useState([]);

    useEffect(() => {
        if (isAuthorized) {
            getMessages().then((msgs) => {
                const pend = msgs.filter(m => m.estado === "pendiente");
                const aprob = msgs.filter(m => m.estado === "aprobado");
                setPendientes(pend);
                setAprobados(aprob);
            }).catch(err => {
                console.error("Error loading messages for moderation:", err);
            });
        }
    }, [isAuthorized]);

    const handleLogin = (e) => {
        e.preventDefault();
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "chavela123";
        if (password === adminPassword) {
            setIsAuthorized(true);
        } else {
            alert("Contraseña incorrecta ❌");
        }
    };

    const handleAprobar = async (index) => {
        const msg = pendientes[index];
        try {
            await updateMessageStatus(msg.id, "aprobado");
            setAprobados((prev) => [...prev, { ...msg, estado: "aprobado" }]);
            setPendientes((prev) => prev.filter((_, idx) => idx !== index));
        } catch (error) {
            console.error(error);
            alert("Error al aprobar el mensaje ❌");
        }
    };

    const handleRechazar = async (index) => {
        const msg = pendientes[index];
        try {
            await deleteMessage(msg.id);
            setPendientes((prev) => prev.filter((_, idx) => idx !== index));
        } catch (error) {
            console.error(error);
            alert("Error al rechazar el mensaje ❌");
        }
    };

    const handleEliminar = async (index) => {
        const msg = aprobados[index];
        try {
            await deleteMessage(msg.id);
            setAprobados((prev) => prev.filter((_, idx) => idx !== index));
        } catch (error) {
            console.error(error);
            alert("Error al eliminar el mensaje ❌");
        }
    };

    if (!isAuthorized) {
        return (
            <div className="moderacion-login-container">
                <button className="btn-volver-blog" onClick={() => navigate("/home")}>
                    ← Volver al Blog
                </button>
                <div className="login-card">
                    <h2>🔐 Acceso de Administrador</h2>
                    <p>Por favor ingresa la contraseña para moderar los mensajes.</p>
                    <form onSubmit={handleLogin} className="login-form">
                        <input
                            type="password"
                            placeholder="Contraseña..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoFocus
                        />
                        <button type="submit">Ingresar</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="moderacion-screen-container">
            <div className="moderacion-header">
                <button className="btn-volver-blog" onClick={() => navigate("/home")}>
                    ← Volver al Blog
                </button>
                <h1>PANEL DE MODERACIÓN 🔐</h1>
            </div>

            <div className="moderacion-grid">
                <div className="moderacion-columna pendientes">
                    <h2>⚠️ Mensajes Pendientes ({pendientes.length})</h2>
                    <div className="mensajes-lista-scroll">
                        {pendientes.length === 0 ? (
                            <div className="no-mensajes-info">
                                No hay mensajes esperando aprobación. ✨
                            </div>
                        ) : (
                            pendientes.map((msg, i) => (
                                <div key={i} className="mensaje-item-mod pendiente">
                                    <div className="mensaje-header-mod">
                                        <span className="nombre">{msg.nombre}</span>
                                        <span className="mail">{msg.mail || "Anónimo"}</span>
                                    </div>
                                    <div className="mensaje-texto-mod">{msg.mensaje}</div>
                                    <div className="acciones-mod">
                                        <button className="btn-mod-aprobar" onClick={() => handleAprobar(i)}>
                                            Aprobar ✓
                                        </button>
                                        <button className="btn-mod-rechazar" onClick={() => handleRechazar(i)}>
                                            Rechazar ×
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="moderacion-columna publicos">
                    <h2>✉ Mensajes Públicos ({aprobados.length})</h2>
                    <div className="mensajes-lista-scroll">
                        {aprobados.length === 0 ? (
                            <div className="no-mensajes-info">
                                No hay mensajes públicos aún.
                            </div>
                        ) : (
                            aprobados.map((msg, i) => (
                                <div key={i} className="mensaje-item-mod publico">
                                    <div className="mensaje-header-mod">
                                        <span className="nombre">{msg.nombre}</span>
                                        <span className="mail">{msg.mail || "Anónimo"}</span>
                                        <button
                                            className="btn-mod-eliminar"
                                            onClick={() => handleEliminar(i)}
                                            title="Eliminar mensaje definitivamente"
                                        >
                                            ×
                                        </button>
                                    </div>
                                    <div className="mensaje-texto-mod">{msg.mensaje}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
