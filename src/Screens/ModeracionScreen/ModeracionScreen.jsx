import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./moderacionScreen.css";
import "../HomeScreen/homeScreen.css"; 

export default function ModeracionScreen() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);

    const [pendientes, setPendientes] = useState(() => {
        const guardados = localStorage.getItem("blog_mensajes_pendientes");
        return guardados ? JSON.parse(guardados) : [];
    });

    const [aprobados, setAprobados] = useState(() => {
        const guardados = localStorage.getItem("blog_mensajes_aprobados");
        return guardados ? JSON.parse(guardados) : [];
    });

    useEffect(() => {
        localStorage.setItem("blog_mensajes_pendientes", JSON.stringify(pendientes));
    }, [pendientes]);

    useEffect(() => {
        localStorage.setItem("blog_mensajes_aprobados", JSON.stringify(aprobados));
    }, [aprobados]);

    const handleLogin = (e) => {
        e.preventDefault();
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "chavela123";
        if (password === adminPassword) {
            setIsAuthorized(true);
        } else {
            alert("Contraseña incorrecta ❌");
        }
    };

    const handleAprobar = (index) => {
        const msg = pendientes[index];
        setAprobados((prev) => [...prev, msg]);
        setPendientes((prev) => prev.filter((_, idx) => idx !== index));
    };

    const handleRechazar = (index) => {
        setPendientes((prev) => prev.filter((_, idx) => idx !== index));
    };

    const handleEliminar = (index) => {
        setAprobados((prev) => prev.filter((_, idx) => idx !== index));
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
