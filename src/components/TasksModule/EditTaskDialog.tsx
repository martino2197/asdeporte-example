import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  MenuItem,
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
import { Task } from "@/components/TasksModule/utils/types";
import { useForm, Controller } from "react-hook-form";
import {
  CATEGORIES,
  DEFAULT_TASK,
  PRIORITIES,
  STATUSES,
  TAG_OPTIONS,
} from "./utils/constants";

interface EditTaskDialogProps {
  open: boolean;
  editingTask: Task | null;
  handleCloseEdit: () => void;
}

const getDefaultTask = (): Task => ({ ...DEFAULT_TASK });

const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
  open,
  editingTask,
  handleCloseEdit,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Task>({
    defaultValues: getDefaultTask(),
  });

  const isEditing = Boolean(editingTask);

  const { executeRequest: createTask, loading: creatingTask } = useApiRequest(
    createTaskUrl(),
    { method: "POST" }
  );

  const { executeRequest: updateTask, loading: updatingTask } = useApiRequest(
    isEditing ? updateTaskUrl(editingTask?.id as number) : "",
    { method: "PUT" }
  );

  useEffect(() => {
    reset(editingTask || getDefaultTask());
  }, [editingTask, reset]);

  const onSubmit = async (data: Task) => {
    try {
      const response = isEditing
        ? await updateTask({ body: data })
        : await createTask({ body: data });
      if (response?.data) {
        dispatch(fetchTasks());
        reset(getDefaultTask());
        handleCloseEdit();
      }
    } catch (error) {
      console.error("Error al guardar la tarea:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        reset(getDefaultTask());
        handleCloseEdit();
      }}
      fullWidth
      maxWidth="sm"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title">
        {isEditing ? "Editar Tarea" : "Nueva Tarea"}
      </DialogTitle>
      <DialogContent id="dialog-description" className="space-y-4">
        <Controller
          name="title"
          control={control}
          rules={{ required: "El título es obligatorio", maxLength: 100 }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Título"
              fullWidth
              margin="normal"
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          rules={{
            maxLength: { value: 300, message: "Máximo 300 caracteres" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Descripción"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />

        <Controller
          name="category"
          control={control}
          rules={{ required: "Selecciona una categoría" }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Categoría"
              fullWidth
              margin="normal"
              error={!!errors.category}
              helperText={
                errors.category?.message || "Selecciona una categoría"
              }
            >
              {CATEGORIES.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="dueDate"
          control={control}
          rules={{
            required: "La fecha es obligatoria",
            validate: (value) =>
              new Date(value) >= new Date() || "La fecha debe ser futura",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="date"
              label="Fecha"
              fullWidth
              InputLabelProps={{ shrink: true }}
              margin="normal"
              error={!!errors.dueDate}
              helperText={errors.dueDate?.message}
            />
          )}
        />

        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Prioridad"
              fullWidth
              margin="normal"
              helperText="Selecciona la prioridad de la tarea"
            >
              {PRIORITIES.map((priority) => (
                <MenuItem key={priority} value={priority}>
                  {priority}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Estado"
              fullWidth
              margin="normal"
              helperText="Selecciona el estado de la tarea"
            >
              {STATUSES.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <Autocomplete
              multiple
              options={TAG_OPTIONS}
              value={field.value}
              onChange={(_, newValue) => field.onChange(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Etiquetas"
                  placeholder="Selecciona o añade etiquetas"
                  fullWidth
                />
              )}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            reset(getDefaultTask());
            handleCloseEdit();
          }}
          variant="text"
          disabled={creatingTask || updatingTask}
          aria-label="Cancelar edición"
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          disabled={creatingTask || updatingTask}
          startIcon={
            creatingTask || updatingTask ? (
              <CircularProgress size={20} />
            ) : undefined
          }
          aria-label="Guardar tarea"
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskDialog;
