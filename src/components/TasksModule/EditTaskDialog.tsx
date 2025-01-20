import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import {
  createTaskUrl,
  updateTaskUrl,
} from "@/components/TasksModule/utils/services";
import { useApiRequest } from "@/hooks/useApiRequest";
import { useDispatch } from "react-redux";
import { fetchTasks } from "@/redux/thunks/tasks.thunks";
import { AppDispatch } from "@/redux/store";

interface EditTaskDialogProps {
  open: boolean;
  editingTask: any | null;
  handleCloseEdit: () => void;
}

// Constantes para categorías, prioridades y estados
const CATEGORIES = ["Trabajo", "Personal", "Estudios", "Otro"];
const PRIORITIES = ["Baja", "Media", "Alta"];
const STATUSES = ["Pendiente", "En Progreso", "Completado"];
const TAG_OPTIONS = ["Urgente", "Importante", "Opcional", "Revisar"];

export default function EditTaskDialog({
  open,
  editingTask,
  handleCloseEdit,
}: EditTaskDialogProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [task, setTask] = useState<any>({
    title: "",
    description: "",
    category: "",
    dueDate: "",
    priority: "Media",
    status: "Pendiente",
    tags: [],
  });

  const isEditing = Boolean(editingTask);

  const { executeRequest: createTask, loading: creatingTask } = useApiRequest(
    createTaskUrl(),
    {
      method: "POST",
    }
  );

  const { executeRequest: updateTask, loading: updatingTask } = useApiRequest(
    isEditing ? updateTaskUrl(editingTask?.id) : "",
    {
      method: "PUT",
    }
  );

  useEffect(() => {
    if (editingTask) {
      setTask(editingTask);
    } else {
      setTask({
        title: "",
        description: "",
        category: "",
        dueDate: "",
        priority: "Media",
        status: "Pendiente",
        tags: [],
      });
    }
  }, [editingTask]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        const response = await updateTask({ body: task });
        if (response?.data) {
          console.log("Tarea actualizada:", response.data);
          handleCloseEdit();
          dispatch(fetchTasks());
        }
      } else {
        const response = await createTask({ body: task });
        if (response?.data) {
          console.log("Tarea creada:", response.data);
          handleCloseEdit();
          dispatch(fetchTasks());
        }
      }
    } catch (error) {
      console.error("Error al guardar la tarea:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleCloseEdit} fullWidth maxWidth="sm">
      <DialogTitle>{isEditing ? "Editar Tarea" : "Nueva Tarea"}</DialogTitle>
      <DialogContent className="space-y-4">
        <TextField
          label="Título"
          name="title"
          value={task.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Descripción"
          name="description"
          value={task.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={3} // Configura que sea de 3 líneas
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Categoría</InputLabel>
          <Select
            name="category"
            value={task.category}
            onChange={(e) =>
              setTask((prev: any) => ({ ...prev, category: e.target.value }))
            }
          >
            {CATEGORIES.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          type="date"
          label="Fecha"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Prioridad</InputLabel>
          <Select
            name="priority"
            value={task.priority}
            onChange={(e) =>
              setTask((prev: any) => ({ ...prev, priority: e.target.value }))
            }
          >
            {PRIORITIES.map((priority) => (
              <MenuItem key={priority} value={priority}>
                {priority}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Estado</InputLabel>
          <Select
            name="status"
            value={task.status}
            onChange={(e) =>
              setTask((prev: any) => ({ ...prev, status: e.target.value }))
            }
          >
            {STATUSES.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Autocomplete
          multiple
          options={TAG_OPTIONS}
          value={task.tags}
          onChange={(_, newValue) =>
            setTask((prev: any) => ({ ...prev, tags: newValue }))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tags"
              placeholder="Selecciona o añade etiquetas"
              fullWidth
            />
          )}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCloseEdit}
          variant="text"
          disabled={creatingTask || updatingTask}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={creatingTask || updatingTask}
          startIcon={
            creatingTask || updatingTask ? (
              <CircularProgress size={20} />
            ) : undefined
          }
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
