// Base URL para la API de tareas
const BASE_TASKS_URL = "/api/tasks";

// Función para obtener todas las tareas
export const getTasksUrl = () => BASE_TASKS_URL;

// Función para obtener una tarea específica por ID
export const getTaskDetailsUrl = (taskId: number) =>
  `${BASE_TASKS_URL}/${taskId}`;

// Función para crear una nueva tarea (puede reutilizar la base)
export const createTaskUrl = () => BASE_TASKS_URL;

// Función para actualizar una tarea específica
export const updateTaskUrl = (taskId: number) => `${BASE_TASKS_URL}/${taskId}`;

// Función para eliminar una tarea específica
export const deleteTaskUrl = (taskId: number) => `${BASE_TASKS_URL}/${taskId}`;
