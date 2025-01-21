// Base URL para la API de tareas, utilizando NEXTAUTH_URL del entorno
const BASE_TASKS_URL = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}`;

// Función para obtener todas las tareas
export const getTasksUrl = () => `${BASE_TASKS_URL}/api/tasks`;

// Función para obtener una tarea específica por ID
export const getTaskDetailsUrl = (taskId: number) =>
  `${BASE_TASKS_URL}/${taskId}`;

// Función para crear una nueva tarea
export const createTaskUrl = () => BASE_TASKS_URL;

// Función para actualizar una tarea específica
export const updateTaskUrl = (taskId: number) => `${BASE_TASKS_URL}/${taskId}`;

// Función para eliminar una tarea específica
export const deleteTaskUrl = (taskId: number) => `${BASE_TASKS_URL}/${taskId}`;
