require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

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
// Servir archivos estáticos (frontend)
// ======================
app.use(express.static(__dirname));

// ======================
// Ruta principal → index.html
// ======================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ======================
// Rutas principales API
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

Frontend:
- GET  / → index.html

API:
- POST /auth/register
- POST /auth/login
- GET  /tasks
- POST /tasks
`);
});
