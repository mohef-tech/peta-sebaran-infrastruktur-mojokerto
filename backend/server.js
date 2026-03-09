const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// PENTING: Serve static files dari folder frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes API
const projectsRoutes = require('./routes/projects');
app.use('/api/projects', projectsRoutes);

// Route untuk halaman utama (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});