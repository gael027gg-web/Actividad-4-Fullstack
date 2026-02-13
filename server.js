require("dotenv").config();

const express = require("express");
const cors = require("cors");

const conectarDB = require("./backend/config/db");


// Routers
const authRoutes = require("./backend/routes/auth.routes");
const taskRoutes = require("./backend/routes/task.routes");


const app = express();

// 🔌 Conectar MongoDB
conectarDB();

const PORT = process.env.PORT || 3000;

// ======================
// Middlewares globales
// ======================
app.use(cors());
app.use(express.json());

// ======================
// Ruta de prueba
// ======================
app.get("/", (req, res) => {
  res.send("🚀 Servidor funcionando correctamente en el puerto " + PORT);
});

// ======================
// Rutas principales
// ======================
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// ======================
// Error handler (solo UNO)
// ======================
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ error: "Error interno del servidor" });
});

// ======================
// Iniciar servidor
// ======================
app.listen(PORT, () => {
  console.log(`
✅ Servidor activo en http://localhost:${PORT}

Rutas disponibles:
- GET  /                 → prueba
- POST /auth/register    → registro
- POST /auth/login       → login
- GET  /tasks            → ver tareas
- POST /tasks            → crear tarea
`);
});
