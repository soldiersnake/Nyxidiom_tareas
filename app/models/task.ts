import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  subtasks: [
    {
      title: { type: String, required: true },
      completed: { type: Boolean, default: false }
    }
  ],
  status: { 
    type: String, 
    enum: ["pendiente", "en progreso", "completada"], 
    default: "pendiente" 
  },
  priority: { 
    type: String, 
    enum: ["baja", "media", "alta"], 
    default: "media" 
  },
  order: { type: Number },  // Útil para drag-and-drop
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },  // Relación con usuarios
  createdAt: { type: Date, default: Date.now },  // Fecha de creación
  updatedAt: { type: Date, default: Date.now },  // Fecha de actualización
});

// Middleware para actualizar `updatedAt` en cada modificación
taskSchema.pre("save", function(next) {
  this.updatedAt = new Date();
  next();
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
