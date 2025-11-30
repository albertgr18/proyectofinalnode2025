import express from 'express';
import admin from 'firebase-admin';

// Clave de servicio de Firestore. 
// Solución para importar JSON en ES Modules de forma compatible
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const serviceAccount = require('./service-account.json');

// Inicializa Firebase Admin.
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore(); // La referencia a base de datos.

// Servidor Funcional con Node.js y Express.js
const app = express();
const PORT = 3000;

// Middleware para que Express pueda leer los cuerpos JSON de las peticiones (POST/PUT)
app.use(express.json());

// Referencia a la colección principal de productos
const productosCollection = db.collection('productos');

// ------------------------------------------------
// 1. GET: Consultar Todos los Productos (REQ. REST API)
// ------------------------------------------------
app.get('/api/productos', async (req, res) => {
    try {
        const snapshot = await productosCollection.get();
        const productos = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        res.status(200).json(productos);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// ---------------------------------------------------------------
// 2. GET: Consultar un Producto Específico (REQUISITO PARÁMETROS)
// ---------------------------------------------------------------
app.get('/api/productos/:id', async (req, res) => {
    try {
        const doc = await productosCollection.doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).send('Producto no encontrado');
        }
        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// ------------------------------------------------------------------
// 3. POST: Crear un Nuevo Producto (REQUISITO SOLICITUD Y RESPUESTA)
// ------------------------------------------------------------------
app.post('/api/productos', async (req, res) => {
    try {
        const nuevoProducto = req.body;
        if (!nuevoProducto || !nuevoProducto.nombre) {
            return res.status(400).send('Faltan datos requeridos.');
        }
        
        const docRef = await productosCollection.add(nuevoProducto);
        res.status(201).json({ 
            id: docRef.id, 
            mensaje: 'Producto creado exitosamente', 
            ...nuevoProducto 
        });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// ------------------------------------------------
// 4. PUT: Actualizar un Producto Existente
// ------------------------------------------------
app.put('/api/productos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await productosCollection.doc(id).update(req.body);
        res.status(200).json({ 
            id: id, 
            mensaje: 'Producto actualizado exitosamente' 
        });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// ------------------------------------------------
// 5. DELETE: Eliminar un Producto
// ------------------------------------------------
app.delete('/api/productos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await productosCollection.doc(id).delete();
        res.status(200).json({ 
            id: id, 
            mensaje: 'Producto eliminado exitosamente' 
        });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta de prueba inicial (DESPUÉS DE TODOS LOS ENDPOINTS)
app.get('/', (req, res) => {
    res.send('Servidor Node.js con Express y Firestore inicializado.');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    console.log(`Base de datos conectada: Productos en la colección 'productos'`);
});