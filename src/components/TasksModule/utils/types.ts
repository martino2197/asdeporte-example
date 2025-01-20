export interface Task {
  id: number;
  title: string;
  description?: string;
  category?: string;
  dueDate?: string;
  priority?: string;
  status?: string;
  tags?: string[];
}
