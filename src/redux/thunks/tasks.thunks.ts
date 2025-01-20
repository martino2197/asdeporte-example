import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTasksUrl } from "@/components/TasksModule/utils/services";

// Manejo de errores
const handleApiError = (error: any, rejectWithValue: any) => {
  return rejectWithValue({
    message: error?.message || "Unknown error occurred",
    statusCode: error?.statusCode || 500,
  });
};

// Thunk para obtener las tareas
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(getTasksUrl(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Response is not an array.");
      }

      return data; // Devuelve la lista de tareas al reducer
    } catch (error: any) {
      return handleApiError(error, rejectWithValue);
    }
  }
);
