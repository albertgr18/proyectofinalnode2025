import fetch from 'node-fetch';

const FAKESTORE_URL = 'https://fakestoreapi.com';

// Para obtener todos los productos (GET)
const getAllProducts = async () => {
    console.log("Consultando todos los productos...");
    try {
        const response = await fetch(`${FAKESTORE_URL}/products`);
        const products = await response.json();
        console.log("--- Lista de Productos ---");
        products.forEach(p => {
            console.log(`[ID: ${p.id}] ${p.title} - $${p.price}`);
        });
        console.log("--------------------------");
    } catch (error) {
        console.error("Error al obtener los productos:", error.message);
    }
};

// Para obtener un producto específico (GET)
const getOneProduct = async (id) => {
    if (isNaN(id)) {
        console.error(`Error: El ID '${id}' no es un número válido.`);
        return;
    }
    console.log(`Consultando producto con ID: ${id}...`);
    try {
        const response = await fetch(`${FAKESTORE_URL}/products/${id}`);
        if (!response.ok) {
            // Error 404
            throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
        }
        const product = await response.json();
        console.log("\n--- Detalles del Producto ---");
        console.log(`Título: ${product.title}`);
        console.log(`ID: ${product.id}`);
        console.log(`Precio: $${product.price}`);
        console.log(`Descripción: ${product.description.substring(0, 100)}...`);
        console.log(`Categoría: ${product.category}`);
        console.log("-----------------------------");
    } catch (error) {
        console.error(`Error al obtener el producto con ID ${id}:`, error.message);
    }
};

// Crear un Producto (POST)
const createProduct = async (title, price, category) => {
    console.log(`Creando un nuevo producto: ${title}...`);
    try {
        const response = await fetch(`${FAKESTORE_URL}/products`, {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                price: parseFloat(price),
                description: "Descripción genérica de un producto creado por el sistema.",
                image: 'https://i.pravatar.cc',
                category: category
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const newProduct = await response.json();
        console.log("\n--- Producto Creado Exitosamente (Respuesta de la API) ---");
        // La API FakeStore 
        console.log(`ID Asignado (simulado): ${newProduct.id}`); 
        console.log(`Título: ${newProduct.title}`);
        console.log(`Precio: $${newProduct.price}`);
        console.log("----------------------------------------------------------");
    } catch (error) {
        console.error("Error al crear el producto:", error.message);
    }
};

// Funcion para eliminar un Producto
const deleteProduct = async (id) => {
    if (isNaN(id)) {
        console.error(`Error: El ID '${id}' no es un número válido para eliminar.`);
        return;
    }
    console.log(`Eliminando producto con ID: ${id}...`);
    try {
        const response = await fetch(`${FAKESTORE_URL}/products/${id}`, {
            method: 'DELETE'
        });
        const deletedProduct = await response.json();
        console.log("\n--- Producto Eliminado Exitosamente (Respuesta de la API) ---");
        console.log(`ID del producto eliminado (simulado): ${deletedProduct.id}`); 
        console.log(`Título: ${deletedProduct.title}`);
        console.log("----------------------------------------------------------");
    } catch (error) {
        console.error(`Error al intentar eliminar el producto con ID ${id}:`, error.message);
    }
};

// Funcion principal que lee y dirige los comandos
export const executeCommand = (args) => {
    // DESTRUCTURING y SPREAD 
    const [ method, path, ...data ] = args;
    const normalizedMethod = method ? method.toUpperCase() : '';

    // --- Para crear productos 
    if (normalizedMethod === 'POST' && path === 'products') {
        if (data.length < 3) {
            console.error("Error: Para crear un producto, necesitas proporcionar al menos: <title> <price> <category>");
            console.error("Ejemplo: npm run start POST products 'Título Ejemplo' 100 'Categoría'");
            return;
        }
        const [title, price, category] = data;
        createProduct(title, price, category);
        return;
    }

    // --- Para eliminar productos 
    const deleteMatch = path ? path.match(/^products\/(\d+)$/) : null;
    if (normalizedMethod === 'DELETE' && deleteMatch) {
        const productId = deleteMatch[1];
        deleteProduct(productId);
        return;
    }

    // --- Para leer productos
    if (normalizedMethod === 'GET') {
        if (path === 'products') {
            getAllProducts();
            return;
        }
        const getMatch = path.match(/^products\/(\d+)$/);
        if (getMatch) {
            const productId = getMatch[1];
            getOneProduct(productId);
            return;
        }
    }

    console.error(`Error: Comando o ruta no reconocido: ${method || ''} ${path || ''}`);
};