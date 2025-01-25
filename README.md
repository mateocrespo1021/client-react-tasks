# Sistema de Gestión de Proyectos y Tareas

Una aplicación desarrollada en React para organizar y gestionar proyectos y tareas de manera eficiente.

## Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/mateocrespo1021/client-react-tasks.git
   ```

2. **Crea el archivo `.env.local` en la raíz del proyecto:**

   Este archivo debe incluir la siguiente configuración para que la aplicación funcione correctamente (El puerto donde este ejecutando tu proyecto springboot):

   ```env
   VITE_API_URL = "http://localhost:8080/api"
   ```

3. **Instala las dependencias:**

   ```bash
   npm install
   ```

4. **Inicia la aplicación:**

   ```bash
   npm run dev
   ```

## Funcionalidades Principales

- **Gestión de Proyectos**: Crear, editar y eliminar proyectos.
- **Gestión de Tareas**: Agregar, asignar y marcar tareas como completadas.
- **Organización**: Categorizar tareas por prioridad y estado.
- **Interfaz Intuitiva**: Fácil de usar y diseñada para optimizar la productividad.
