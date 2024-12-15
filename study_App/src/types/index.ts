export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  category: 'homework' | 'study' | 'project';
}

export interface StudySession {
  id: string;
  startTime: string;
  duration: number;
  taskId: string;
}