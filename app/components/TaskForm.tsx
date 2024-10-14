import { Form } from "@remix-run/react";
import { useState } from "react";

export default function TaskForm() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    // Limpiar los inputs despues del envío
    setTitle("");
    setDescription("");
    setCompleted(false);
  };

  return (
    <>
      <div className="p-6 bg-white shadow-md rounded-lg mt-2">
        <Form method="post" className="space-y-4" onSubmit={handleSubmit}>
          <div>
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
          </div>

          <div>
            <label className="block text-lg font-medium">Descripción</label>
            <textarea
              name="description"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring focus:ring-teal-200"
              placeholder="Descripción de la tarea"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
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
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-teal-700 focus:ring focus:ring-teal-200"
          >
            Guardar Tarea
          </button>
        </Form>
      </div>
    </>
  );
}
