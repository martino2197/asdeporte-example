// pages/api/tasks/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import tasksData from "../../../../data/task.json";
const tasks = tasksData as {
  id: number;
  title: string;
  description?: string;
}[];

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
    const { title, description } = req.body;
    if (title !== undefined) tasks[taskIndex].title = title;
    if (description !== undefined) tasks[taskIndex].description = description;
    return res.status(200).json(tasks[taskIndex]);
  }

  if (req.method === "DELETE") {
    // ELIMINAR TAREA
    const deletedTask = tasks[taskIndex];
    tasks.splice(taskIndex, 1);
    return res.status(200).json(deletedTask);
  }

  // Si llega aquí y no coincide ningún método permitido
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
