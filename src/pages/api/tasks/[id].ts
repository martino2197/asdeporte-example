import type { NextApiRequest, NextApiResponse } from "next";
import tasksData from "../../../../data/task.json";
interface Task {
  id: number;
  title: string;
  description?: string;
  category?: string;
  dueDate?: string;
  priority?: string;
  status?: string;
  tags?: string[];
}

const tasks = tasksData as Task[];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const taskId = parseInt(id as string);

  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  if (req.method === "GET") {
    return res.status(200).json(tasks[taskIndex]);
  }

  if (req.method === "PUT" || req.method === "PATCH") {
    const { title, description, category, dueDate, priority, status, tags } =
      req.body;

    if (title !== undefined) tasks[taskIndex].title = title;
    if (description !== undefined) tasks[taskIndex].description = description;
    if (category !== undefined) tasks[taskIndex].category = category;
    if (dueDate !== undefined) tasks[taskIndex].dueDate = dueDate;
    if (priority !== undefined) tasks[taskIndex].priority = priority;
    if (status !== undefined) tasks[taskIndex].status = status;
    if (tags !== undefined) tasks[taskIndex].tags = tags;

    return res.status(200).json(tasks[taskIndex]);
  }

  if (req.method === "DELETE") {
    const deletedTask = tasks[taskIndex];
    tasks.splice(taskIndex, 1);
    return res.status(200).json(deletedTask);
  }

  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
