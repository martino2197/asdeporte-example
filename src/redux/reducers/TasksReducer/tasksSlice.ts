import { Task } from "@/components/TasksModule/utils/types";
import { fetchTasks } from "@/redux/thunks/tasks.thunks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TasksState {
  tasks: Task[];
  statusFetch: "idle" | "loading" | "succeeded" | "failed";
  fetchError: {
    message: string;
    statusCode?: number;
  } | null;
}

const initialState: TasksState = {
  tasks: [],
  statusFetch: "idle",
  fetchError: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearTasks(state) {
      state.tasks = [];
      state.statusFetch = "idle";
      state.fetchError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.statusFetch = "loading";
        state.fetchError = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.statusFetch = "succeeded";
        state.tasks = action.payload;
        state.fetchError = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.statusFetch = "failed";
        state.fetchError = action.payload as {
          message: string;
          statusCode?: number;
        };
      });
  },
});

export const { clearTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
