import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

interface Task {
  id: number;
  title: string;
  description?: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Ejemplo: obtener la lista de tareas al montar
  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  // Crear nueva tarea
  const handleCreateTask = async () => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      const newTask = await res.json();

      // Actualizar estado local
      setTasks((prev) => [...prev, newTask]);
      // Limpiar inputs
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  // Pequeña UI
  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <Typography variant="h4" gutterBottom>
        Lista de Tareas
      </Typography>

      {/* Formulario para crear tarea */}
      <Card className="mb-6">
        <CardContent>
          <div className="space-y-4">
            <TextField
              label="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
            <TextField
              label="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={handleCreateTask}>
              Agregar Tarea
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Listado de tareas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tasks.map((task) => (
          <Card key={task.id} className="hover:shadow-lg">
            <CardContent>
              <Typography variant="h6">{task.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {task.description || "Sin descripción"}
              </Typography>
              <div className="mt-4 flex gap-2">
                <Button variant="outlined" color="primary">
                  Editar
                </Button>
                <Button variant="outlined" color="error">
                  Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
