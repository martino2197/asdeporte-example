import { NextPage } from "next";
import { useState } from "react";
import { Typography, Button } from "@mui/material";
import TaskList from "@/components/TasksModule/TaskList";
import EditTaskDialog from "@/components/TasksModule/EditTaskDialog";
import { Task } from "@/components/TasksModule/utils/types";

const TasksPage: NextPage = () => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" className="font-bold">
          Lista de Tareas
        </Typography>
        <Button variant="contained" onClick={() => setIsEditOpen(true)}>
          Nueva Tarea
        </Button>
      </div>
      <TaskList onEdit={handleEditTask} />
      <EditTaskDialog
        open={isEditOpen}
        editingTask={editingTask}
        handleCloseEdit={handleCloseEdit}
      />
    </div>
  );
};

export default TasksPage;
