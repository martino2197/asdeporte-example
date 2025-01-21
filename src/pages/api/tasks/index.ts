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
  if (req.method === "GET") {
    return res.status(200).json(tasks);
  }

  if (req.method === "POST") {
    const { title, description, category, dueDate, priority, status, tags } =
      req.body;

    if (!title) {
      return res.status(400).json({ error: "El título es obligatorio" });
    }

    const newId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;

    const newTask: Task = {
      id: newId,
      title,
      description: description || "",
      category: category || "Entrenamiento", // puedes poner un valor por defecto
      dueDate: dueDate || "",
      priority: priority || "Media",
      status: status || "Pendiente",
      tags: tags || [],
    };

    tasks.push(newTask);
    return res.status(201).json(newTask);
  }

  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
