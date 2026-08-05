const API_URL = "/api";

const LS_PENDIENTES = "blog_mensajes_pendientes";
const LS_APROBADOS = "blog_mensajes_aprobados";

let useLocalFallback = false;

const getLocalData = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};

const saveLocalData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

function getLocalFallbackMessages() {
    const pendientes = getLocalData(LS_PENDIENTES).map((msg, index) => ({
        ...msg,
        id: `local-pending-${index}`,
        estado: "pendiente"
    }));
    const aprobados = getLocalData(LS_APROBADOS).map((msg, index) => ({
        ...msg,
        id: `local-approved-${index}`,
        estado: "aprobado"
    }));
    return [...pendientes, ...aprobados];
}

function addLocalFallbackMessage({ nombre, mail, mensaje }) {
    const nuevoMensaje = {
        nombre,
        mail: mail || "Anónimo",
        mensaje,
        estado: "pendiente",
        fecha: new Date().toISOString()
    };
    const pendientes = getLocalData(LS_PENDIENTES);
    pendientes.push(nuevoMensaje);
    saveLocalData(LS_PENDIENTES, pendientes);
    return { ...nuevoMensaje, id: `local-pending-${pendientes.length - 1}` };
}

function updateLocalFallbackStatus(id, newStatus) {
    if (id.startsWith("local-pending-")) {
        const index = parseInt(id.replace("local-pending-", ""), 10);
        const pendientes = getLocalData(LS_PENDIENTES);
        const msg = pendientes[index];
        if (msg) {
            if (newStatus === "aprobado") {
                msg.estado = "aprobado";
                const aprobados = getLocalData(LS_APROBADOS);
                aprobados.push(msg);
                saveLocalData(LS_APROBADOS, aprobados);
            }
            const updatedPendientes = pendientes.filter((_, idx) => idx !== index);
            saveLocalData(LS_PENDIENTES, updatedPendientes);
        }
    } else if (id.startsWith("local-approved-")) {
        const index = parseInt(id.replace("local-approved-", ""), 10);
        const aprobados = getLocalData(LS_APROBADOS);
        const updatedAprobados = aprobados.filter((_, idx) => idx !== index);
        saveLocalData(LS_APROBADOS, updatedAprobados);
    }
    return true;
}

function deleteLocalFallbackMessage(id) {
    if (id.startsWith("local-pending-")) {
        const index = parseInt(id.replace("local-pending-", ""), 10);
        const pendientes = getLocalData(LS_PENDIENTES);
        const updatedPendientes = pendientes.filter((_, idx) => idx !== index);
        saveLocalData(LS_PENDIENTES, updatedPendientes);
    } else if (id.startsWith("local-approved-")) {
        const index = parseInt(id.replace("local-approved-", ""), 10);
        const aprobados = getLocalData(LS_APROBADOS);
        const updatedAprobados = aprobados.filter((_, idx) => idx !== index);
        saveLocalData(LS_APROBADOS, updatedAprobados);
    }
    return true;
}

export async function getMessages() {
    if (useLocalFallback) {
        return getLocalFallbackMessages();
    }

    try {
        const response = await fetch(`${API_URL}/messages`);
        if (!response.ok) throw new Error("API responded with an error");
        return await response.json();
    } catch (error) {
        console.warn("Backend API not available. Using localStorage fallback.", error);
        useLocalFallback = true;
        return getLocalFallbackMessages();
    }
}

export async function addMessage({ nombre, mail, mensaje }) {
    if (useLocalFallback) {
        return addLocalFallbackMessage({ nombre, mail, mensaje });
    }

    try {
        const response = await fetch(`${API_URL}/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombre, mail, mensaje })
        });
        if (!response.ok) throw new Error("API post failed");
        const resData = await response.json();
        return {
            nombre,
            mail: mail || "Anónimo",
            mensaje,
            estado: "pendiente",
            fecha: new Date().toISOString(),
            id: resData.id
        };
    } catch (error) {
        console.warn("Backend API post failed. Using localStorage fallback.", error);
        return addLocalFallbackMessage({ nombre, mail, mensaje });
    }
}

export async function updateMessageStatus(id, newStatus) {
    if (useLocalFallback || id.startsWith("local-")) {
        return updateLocalFallbackStatus(id, newStatus);
    }

    try {
        const response = await fetch(`${API_URL}/messages/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ estado: newStatus })
        });
        if (!response.ok) throw new Error("API patch failed");
        return true;
    } catch (error) {
        console.warn("Backend API patch failed. Using localStorage fallback.", error);
        return updateLocalFallbackStatus(id, newStatus);
    }
}

export async function deleteMessage(id) {
    if (useLocalFallback || id.startsWith("local-")) {
        return deleteLocalFallbackMessage(id);
    }

    try {
        const response = await fetch(`${API_URL}/messages/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) throw new Error("API delete failed");
        return true;
    } catch (error) {
        console.warn("Backend API delete failed. Using localStorage fallback.", error);
        return deleteLocalFallbackMessage(id);
    }
}
