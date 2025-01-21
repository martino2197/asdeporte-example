# Proyecto: Aplicación Frontend con Next.js y NextAuth

## Descripción

Esta aplicación fue creada como parte de una prueba técnica para mostrar capacidades en el desarrollo frontend utilizando Next.js, NextAuth y TypeScript. El proyecto abarca la autenticación de usuarios y el manejo de un recurso ficticio llamado "tareas".

---

## Decisiones Técnicas

### Autenticación
- **Herramienta**: NextAuth.js.
- **Proveedor**: Google.
- **Razón**: Configurar un sistema de autenticación seguro y que pueda crecer con el tiempo.

### Gestión de Datos
- **Origen**: Archivo JSON local como simulación de una API.
- **CRUD**: Funciones para Crear, Leer, Actualizar y eliminar tareas.
- **Componentización**:
  - `TaskList`: Sección que muestra las tareas.
  - `EditTaskDialog`: Ventana modal para añadir o modificar tareas.

### Estado Global
- **Herramienta**: Redux Toolkit.
- **Razón**: Mejorar la sincronización del estado global con la interfaz y garantizar su escalabilidad.

### Buenas Prácticas
- **Modularidad**:
  - División de la lógica en componentes y funciones auxiliares.
  - Aplicación de un archivo `constants.ts` para valores que se repiten.
- **Tipado**:
  - Uso amplio de TypeScript en componentes y lógica del proyecto.

---

## Funcionalidades Implementadas

- Sistema de autenticación que permite iniciar y cerrar sesión de manera dinámica.
- Completo manejo de tareas a través de operaciones CRUD.
- Sincronización instantánea entre la interfaz de usuario y el estado global.

---

## Diseño y Estilo

- **Framework**: Material UI (MUI) para obtener componentes que sean responsivos y coherentes.
- **Accesibilidad**: Implementación de etiquetas `aria` en componentes importantes.

---

## Despliegue
- La aplicación está disponible en [Vercel](https://asdeporte-example.vercel.app/).