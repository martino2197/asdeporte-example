import type { NextApiRequest, NextApiResponse } from "next";

import tasksData from "../../../../data/task.json";

const tasks = tasksData as {
  id: number;
  title: string;
  description?: string;
}[];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(tasks);
  }

  if (req.method === "POST") {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: "El título es obligatorio" });
    }

    const newId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    const newTask = { id: newId, title, description };
    tasks.push(newTask);

    return res.status(201).json(newTask);
  }

  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
