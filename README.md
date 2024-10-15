# A mi Prueba Tecnica de Nyxidiom!

Este proyecto es un **MVP (Minimum Viable Product)** para un gestor de tareas, similar a Jira o Trello, desarrollado utilizando **Remix.js** y **MongoDB** como base de datos. La aplicación permite crear, editar, y eliminar tareas, mostrando notificaciones visuales al usuario.

### URL del Deploy en Producción
El proyecto está desplegado en Netlify y puedes acceder a la aplicación en la siguiente URL:
**[https://nyxidiom-tareas.netlify.app/](https://nyxidiom-tareas.netlify.app/)**

## Funcionalidades Implementadas

1. **Creación de tareas**: Los usuarios pueden agregar nuevas tareas con un título, descripción y estado de completado.
2. **Edición de tareas**: Al hacer doble clic en una tarea, se carga en el formulario para ser actualizada.
3. **Eliminación de tareas**: Las tareas pueden ser eliminadas a través de un botón "X".
4. **Notificaciones**: Implementé notificaciones visuales utilizando **React Toastify** que informan al usuario sobre la creación, actualización o eliminación de tareas.
5. **Persistencia de datos**: La aplicación usa **MongoDB** para almacenar las tareas. El string de conexión a la base de datos está configurado a través de una variable de entorno `MONGODB_URI`.
6. **Interfaz intuitiva**: El estado de las tareas (completadas o no) está representado visualmente, y hay tooltips para guiar al usuario.

## Instalación y Uso Local

Para ejecutar el proyecto localmente, sigue estos pasos:

## Instalacion

Instala las dependencias: Asegúrate de tener Node.js y npm instalados.:

```shellscript
npm install
```

## Configura la base de datos

Crea un archivo .env en la raíz del proyecto y define la variable de entorno para conectar tu base de datos de MongoDB:

```sh
MONGODB_URI = mongodb+srv://marianomacias:1234@prueba-tecnica.el5jm.mongodb.net/
```

## Ejecuta la aplicación

```sh
npm run dev
```

La aplicación estará disponible en http://localhost:3000/


## Estructura del Proyecto

### app/routes/_index.tsx:
- La página principal que lista las tareas y contiene el formulario para agregar o actualizar tareas.
### app/components/TaskForm.tsx:
- Componente del formulario que gestiona la creación y actualización de tareas.
### app/components/Tasks.tsx:
- Componente que muestra cada tarea con opciones para editar o eliminar.
### app/utils/db.server.ts:
- Archivo de configuración y conexión a la base de datos MongoDB.

## Tecnologías Usadas

### Remix.js:
- Framework para React que permite desarrollar aplicaciones full-stack.
### MongoDB:
- Base de datos NoSQL para almacenar las tareas.
### React Toastify:
- Librería para mostrar notificaciones al usuario.
### Netlify:
- Utilizado para el despliegue de la aplicación en producción.
### Tailwind CSS:
- Para estilizar los componentes y la interfaz de usuario.

## Pruebas y Validaciones
Durante el desarrollo, se implementaron las siguientes validaciones y funcionalidades adicionales:

### Formulario reactivo:
- Cuando se selecciona una tarea, el formulario se llena automáticamente con los datos para su actualización. Tras actualizar o crear una tarea, el formulario se reinicia automáticamente.
### Notificaciones:
- Se utiliza React Toastify para informar al usuario cuando se realiza una operación como la creación, edición o eliminación de tareas.
### Despliegue en producción:
- La aplicación ha sido desplegada exitosamente en Netlify y es accesible públicamente.

## Comentarios Finales

#### Este proyecto cumple con los requisitos solicitados para la prueba técnica, implementando un gestor de tareas funcional, con persistencia de datos, notificaciones visuales y una interfaz amigable e intuitiva.