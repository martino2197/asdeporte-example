import { Task } from "./types";

export const CATEGORIES = ["Entrenamiento", "Nutrición", "Equipamiento"];
export const PRIORITIES = ["Baja", "Media", "Alta"];
export const STATUSES = ["Pendiente", "En Progreso", "Completado"];
export const TAG_OPTIONS = [
  "carrera",
  "resistencia",
  "nutrición",
  "plan",
  "equipo",
  "material",
];

export const DEFAULT_TASK: Task = {
  id: 0,
  title: "",
  description: "",
  category: "",
  dueDate: "",
  priority: "Media",
  status: "Pendiente",
  tags: [],
};
