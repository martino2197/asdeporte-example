import React from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

interface TaskFormProps {
  title: string;
  description: string;
  category: string;
  dueDate: string;
  priority: string;
  status: string;
  tags: string[];
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setDueDate: React.Dispatch<React.SetStateAction<string>>;
  setPriority: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  handleCreateTask: () => void;
}

export default function TaskForm({
  title,
  description,
  category,
  dueDate,
  priority,
  status,
  tags,
  setTitle,
  setDescription,
  setCategory,
  setDueDate,
  setPriority,
  setStatus,
  setTags,
  handleCreateTask,
}: TaskFormProps) {
  // Ejemplo rápido de capturar un array de tags (puede ser más complejo)
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Separar por comas
    const tagArray = e.target.value.split(",").map((tag) => tag.trim());
    setTags(tagArray);
  };

  return (
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
          <TextField
            label="Categoría"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
          />
          <TextField
            label="Fecha (dueDate)"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth>
            <InputLabel id="priority-label">Prioridad</InputLabel>
            <Select
              labelId="priority-label"
              value={priority}
              label="Prioridad"
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value="Baja">Baja</MenuItem>
              <MenuItem value="Media">Media</MenuItem>
              <MenuItem value="Alta">Alta</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="status-label">Estado</InputLabel>
            <Select
              labelId="status-label"
              value={status}
              label="Estado"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="Pendiente">Pendiente</MenuItem>
              <MenuItem value="En Progreso">En Progreso</MenuItem>
              <MenuItem value="Completado">Completado</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Tags (separados por comas)"
            value={tags.join(", ")}
            onChange={handleTagsChange}
            fullWidth
          />
          <Button variant="contained" onClick={handleCreateTask}>
            Agregar Tarea
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
