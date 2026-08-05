import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
let client;
let db;

async function connectDB() {
    if (db) return db;
    if (!uri) {
        throw new Error("MONGODB_URI is not defined in environment variables");
    }
    client = new MongoClient(uri);
    await client.connect();
    db = client.db("blog");
    return db;
}

const router = express.Router();

router.get("/messages", async (req, res) => {
    try {
        const database = await connectDB();
        const messages = await database.collection("messages").find({}).toArray();
        const mapped = messages.map(msg => ({
            id: msg._id.toString(),
            nombre: msg.nombre,
            mail: msg.mail,
            mensaje: msg.mensaje,
            estado: msg.estado,
            fecha: msg.fecha
        }));
        res.json(mapped);
    } catch (error) {
        console.error("GET /messages error:", error);
        res.status(500).json({ error: error.message });
    }
});

router.post("/messages", async (req, res) => {
    try {
        const database = await connectDB();
        const { nombre, mail, mensaje } = req.body;
        
        if (!nombre || !mensaje) {
            return res.status(400).json({ error: "Nombre and mensaje are required" });
        }

        const nuevoMensaje = {
            nombre,
            mail: mail || "Anónimo",
            mensaje,
            estado: "pendiente",
            fecha: new Date().toISOString()
        };

        const result = await database.collection("messages").insertOne(nuevoMensaje);
        res.json({ id: result.insertedId.toString() });
    } catch (error) {
        console.error("POST /messages error:", error);
        res.status(500).json({ error: error.message });
    }
});

router.patch("/messages/:id", async (req, res) => {
    try {
        const database = await connectDB();
        const { id } = req.params;
        const { estado } = req.body;

        if (!estado) {
            return res.status(400).json({ error: "Estado is required" });
        }

        const result = await database.collection("messages").updateOne(
            { _id: new ObjectId(id) },
            { $set: { estado } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Message not found" });
        }

        res.json({ success: true });
    } catch (error) {
        console.error("PATCH /messages/:id error:", error);
        res.status(500).json({ error: error.message });
    }
});

router.delete("/messages/:id", async (req, res) => {
    try {
        const database = await connectDB();
        const { id } = req.params;

        const result = await database.collection("messages").deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Message not found" });
        }

        res.json({ success: true });
    } catch (error) {
        console.error("DELETE /messages/:id error:", error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/health", async (req, res) => {
    try {
        await connectDB();
        res.json({ status: "OK", database: "connected" });
    } catch (error) {
        res.status(500).json({ status: "ERROR", database: error.message });
    }
});

app.use("/api", router);
app.use("/", router);

const isDirect = process.argv[1] && (
    process.argv[1] === fileURLToPath(import.meta.url) || 
    process.argv[1].endsWith("api/index.js") ||
    process.argv[1].endsWith("api\\index.js")
);

if (isDirect) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`[API] Server running locally on port ${PORT}`);
    });
}

export default app;
