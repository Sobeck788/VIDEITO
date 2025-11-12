const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del Fronted (con "e")
const frontedPath = path.join(__dirname, '../Fronted');
console.log('📁 Sirviendo archivos desde:', frontedPath);
app.use(express.static(frontedPath));

// Importar rutas
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Rutas para las páginas HTML - CORREGIDAS
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Fronted/Index.html'));
});

app.get('/reproduccion', (req, res) => {
    res.sendFile(path.join(__dirname, '../Fronted/Reproduccion.html'));
});

app.get('/perfil', (req, res) => {
    res.sendFile(path.join(__dirname, '../Fronted/Perfil.html'));
});

app.get('/historial', (req, res) => {
    res.sendFile(path.join(__dirname, '../Fronted/Historial.html'));
});

app.get('/foto', (req, res) => {
    res.sendFile(path.join(__dirname, '../Fronted/Foto.html'));
});

app.get('/contrasena', (req, res) => {
    res.sendFile(path.join(__dirname, '../Fronted/Contraseña.html'));
});

// Ruta de prueba
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: '🚀 Servidor VideITO funcionando',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({ 
        error: 'Ruta no encontrada',
        path: req.originalUrl,
        availableRoutes: ['/', '/reproduccion', '/perfil', '/historial', '/foto', '/contrasena', '/api/videos', '/api/history', '/health']
    });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error('💥 Error del servidor:', err.message);
    res.status(500).json({ 
        error: 'Error interno del servidor',
        message: err.message
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log('\n✨ ======================================');
    console.log('🚀 Servidor VideITO INICIADO CORRECTAMENTE');
    console.log('✨ ======================================');
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`🔧 Puerto: ${PORT}`);
    console.log(`📁 Carpeta: Fronted`);
    console.log(`📹 YouTube API: ${process.env.YOUTUBE_API_KEY ? '✅ CONFIGURADA' : '❌ USANDO DATOS DE EJEMPLO'}`);
    console.log('💡 Tip: Ve a http://localhost:3000 en tu navegador');
    console.log('======================================\n');
});

// Manejar cierre graceful
process.on('SIGINT', () => {
    console.log('\n🛑 Cerrando servidor VideITO...');
    process.exit(0);
});