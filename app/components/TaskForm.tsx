import { useState, useEffect } from "react";
import { Form } from "@remix-run/react";
import { TaskType } from "~/types";

// declaracion del tipo de props
type TasksProps = {
  selectedTask: TaskType | null;
  onSubmit: () => void;
};

export default function TaskForm({ selectedTask, onSubmit  }: TasksProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  // Si recibimos una tarea seleccionada, llenamos los valores del formulario
  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description || "");
      setCompleted(selectedTask.completed || false);
    } else {
      // Reseteamos el formulario si no hay tarea seleccionada
      setTitle("");
      setDescription("");
      setCompleted(false);
    }
  }, [selectedTask]);

  const handleSubmit = () => {
    // Notificamos al componente padre que el formulario ha sido enviado
    onSubmit();
    // Reseteamos los valores del formulario después del envío
    setTitle("");
    setDescription("");
    setCompleted(false);
  };

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <input type="hidden" name="_method" value={selectedTask ? "UPDATE" : "POST"} />
      <input type="hidden" name="taskId" value={selectedTask?._id} />

      <label className="block text-lg font-medium">Título</label>
      <input
        type="text"
        name="title"
        className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring focus:ring-teal-200"
        placeholder="Título de la tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label className="block text-lg font-medium">Descripción</label>
      <textarea
        name="description"
        className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring focus:ring-teal-200"
        placeholder="Descripción de la tarea"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label className="inline-flex items-center">
        <input
          type="checkbox"
          name="completed"
          className="form-checkbox h-5 w-5 text-teal-600"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <span className="ml-2 text-lg">Completada</span>
      </label>

      <button
        type="submit"
        className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-teal-700 focus:ring focus:ring-teal-200"
      >
        {selectedTask ? "Actualizar Tarea" : "Crear Tarea"}
      </button>
    </Form>
  );
}
