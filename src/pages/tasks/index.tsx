import { useState } from "react";
import { Typography, Button } from "@mui/material";
import TaskList from "@/components/TasksModule/TaskList";
import EditTaskDialog from "@/components/TasksModule/EditTaskDialog";

export default function TasksPage() {
  const [editingTask, setEditingTask] = useState<any | null>(null); // Tarea en edición
  const [isEditOpen, setIsEditOpen] = useState(false); // Estado del modal

  // Abrir modal de edición
  const handleEditTask = (task: any) => {
    setEditingTask(task);
    setIsEditOpen(true);
  };

  // Cerrar modal de edición
  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <div className="w-full flex justify-between items-center">
        <Typography variant="h4" gutterBottom>
          Lista de Tareas
        </Typography>
        <Button
          variant="contained"
          onClick={() => setIsEditOpen(true)} // Abrir modal para nueva tarea
        >
          Nueva Tarea
        </Button>
      </div>

      {/* Lista de tareas */}
      <TaskList onEdit={handleEditTask} />

      {/* Modal de edición */}
      <EditTaskDialog
        open={isEditOpen}
        editingTask={editingTask}
        handleCloseEdit={handleCloseEdit}
      />
    </div>
  );
}
