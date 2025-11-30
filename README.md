# 🚀 Proyecto final - Node (Talento Tech 2025)

## 📝 Alumno: Alberto Garcia

Este proyecto marca la culminación del curso. Implementa un servidor funcional desarrollado con **Node.js** y **Express.js**, que expone una **API REST** completa (CRUD) para la gestión de productos. La persistencia de los datos se realiza mediante la implementación de **Firestore**, un servicio en la nube.

---

## ✨ Tecnologías Clave y Requisitos Cumplidos

| Requisito del Curso | Tecnología / Enfoque Utilizado |
| :--- | :--- |
| **Servidor Funcional** | Node.js y **Express.js** |
| **Endpoints REST API** | Implementación de las cinco rutas CRUD (GET, POST, PUT, DELETE) gestionando parámetros y respuestas. |
| **Servicio en la Nube** | **Google Cloud Firestore** (a través de `firebase-admin`) para la gestión de datos. |
| **Documentación Básica** | Este archivo README explica la arquitectura y el uso del proyecto. |

---

## 💻 Instalación y Ejecución

Para ejecutar este proyecto, sigue los siguientes pasos:

### 1. Configuración de Credenciales
Debido a que el proyecto utiliza Firestore, se requiere un archivo de clave de servicio para la autenticación:

* **Archivo Requerido:** Coloca el archivo **`service-account.json`** (obtenido de la Consola de Firebase) en la raíz de este proyecto.
    * *(Nota de Seguridad: Este archivo está excluido del repositorio por motivos de seguridad.)*

### 2. Instalación de Dependencias
Asegúrate de estar en la carpeta raíz del proyecto en tu terminal y ejecuta:

```bash
npm install
