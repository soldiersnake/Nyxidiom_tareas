export type TaskType = {
    _id: string; 
    title: string; 
    description?: string; 
    completed: boolean; 
    subtasks?: Subtask[]; 
    status: "pendiente" | "en progreso" | "completada"; 
    priority: "baja" | "media" | "alta"; 
    order?: number; 
    assignedTo?: string; 
    createdAt: Date | string; 
    updatedAt: Date | string; 
  };
  
  // Definición del type para las subtareas
  export type Subtask = {
    title: string;
    completed: boolean;
  };
  