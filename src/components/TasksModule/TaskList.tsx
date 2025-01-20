import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Fade,
  Chip,
  CircularProgress,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Task } from "./utils/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchTasks } from "@/redux/thunks/tasks.thunks";
import { useApiRequest } from "@/hooks/useApiRequest";

interface TaskListProps {
  onEdit: (task: Task) => void;
}

export default function TaskList({ onEdit }: TaskListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, statusFetch, fetchError } = useSelector(
    (state: RootState) => state.tasks
  );

  // Hook para manejar eliminación de tareas
  const { executeRequest: removeTask, loading: deletingTask } = useApiRequest(
    "http://localhost:3000/api/tasks", // Base endpoint
    { method: "DELETE" }
  );

  // Cargar tareas al montar el componente
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDeleteTask = async (taskId: number) => {
    try {
      console.log("Intentando eliminar tarea con ID:", taskId);
      const response = await removeTask({ path: `/${taskId}` }); // Añadir path dinámico
      if (!response?.error) {
        console.log("Tarea eliminada:", taskId);
        dispatch(fetchTasks()); // Actualizar el listado tras eliminar
      }
    } catch (error: any) {
      console.error("Error al eliminar tarea:", error.message);
      alert(`No se pudo eliminar la tarea: ${error.message}`);
    }
  };

  if (statusFetch === "loading") {
    return (
      <div className="flex justify-center my-6">
        <CircularProgress />
      </div>
    );
  }

  if (statusFetch === "failed") {
    return (
      <div className="my-6 text-center">
        <Typography variant="h6" color="error">
          Error al cargar tareas: {fetchError?.message || "Desconocido"}
        </Typography>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="my-6">
        <Typography variant="h6" align="center" color="textSecondary">
          Aún no hay tareas creadas.
        </Typography>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tasks.map((task, index) => (
        <Fade in={true} timeout={300 + index * 150} key={task.id}>
          <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
            <CardContent className="space-y-4">
              {/* Título de la tarea */}
              <div>
                <Typography
                  variant="h6"
                  className="font-bold"
                  color="primary"
                  gutterBottom
                >
                  {task.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {task.description || "Sin descripción"}
                </Typography>
              </div>
              <Divider />

              {/* Información adicional */}
              <div>
                <Typography variant="subtitle2" color="textSecondary">
                  Categoría:
                </Typography>
                <Chip
                  label={task.category || "No especificada"}
                  variant="outlined"
                />
              </div>
              <div>
                <Typography variant="subtitle2" color="textSecondary">
                  Fecha límite:
                </Typography>
                <Typography variant="body2">
                  {task.dueDate || "No definida"}
                </Typography>
              </div>
              <Divider />

              {/* Estado y prioridad */}
              <div className="flex flex-wrap gap-2">
                <Chip
                  label={`Estado: ${task.status}`}
                  color={
                    task.status === "Completado"
                      ? "success"
                      : task.status === "En Progreso"
                      ? "warning"
                      : "default"
                  }
                />
                <Chip
                  label={`Prioridad: ${task.priority}`}
                  color={task.priority === "Alta" ? "error" : "default"}
                />
              </div>
              <Divider />

              {/* Tags */}
              <div>
                <Typography variant="subtitle2" color="textSecondary">
                  Etiquetas:
                </Typography>
                <div className="flex flex-wrap gap-2 mt-2">
                  {task.tags?.length ? (
                    task.tags.map((tag) => (
                      <Chip key={tag} label={tag} variant="outlined" />
                    ))
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      Sin etiquetas
                    </Typography>
                  )}
                </div>
              </div>
              <Divider />

              {/* Botones de acción */}
              <div className="flex items-center justify-between mt-4">
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => onEdit(task)}
                >
                  Editar
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteTask(task.id)}
                  disabled={deletingTask}
                >
                  Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        </Fade>
      ))}
    </div>
  );
}
