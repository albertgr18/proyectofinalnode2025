import { executeCommand } from './commandHandler.js'; 

console.log("*******El Pre-Proyecto de Tienda ha iniciado correctamente!*******");
console.log("-----------------------------------------------------");

const args = process.argv.slice(2);

if (args.length === 0) {
    console.log("\nUso: npm run start [MÉTODO] [RUTA] [DATOS_OPCIONALES]");
    console.log("Ejemplos:");
    console.log("  - Listar: npm run start GET products");
    console.log("  - Ver uno: npm run start GET products/15");
    console.log("  - Crear: npm run start POST products 'Título Ejemplo' 100 'Categoría'");
    console.log("  - Eliminar: npm run start DELETE products/7");
    console.log("\n-----------------------------------------------------");
} else {
  
    executeCommand(args);
}