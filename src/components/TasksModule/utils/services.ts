const BASE_TASKS_URL = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/tasks`;

export const getTasksUrl = () => `${BASE_TASKS_URL}`;

export const getTaskDetailsUrl = (taskId: number) =>
  `${BASE_TASKS_URL}/${taskId}`;

export const createTaskUrl = () => BASE_TASKS_URL;

export const updateTaskUrl = (taskId: number) => `${BASE_TASKS_URL}/${taskId}`;

export const deleteTaskUrl = () =>
  `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/tasks`;
