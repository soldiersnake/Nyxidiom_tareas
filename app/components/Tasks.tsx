import { Form } from "@remix-run/react";
import { TaskType } from "../types/index";

// declaracion del tipo de props
type TasksProps = {
  tasks: TaskType;
  onDoubleClick: (task: TaskType) => void;
};

export default function Tasks({ tasks, onDoubleClick }: TasksProps) {
  return (
    <>
      <div className="relative group">
      <div
        className={`border-2 w-full p-3 flex justify-between items-start rounded-md shadow-md transition-colors ${
          tasks.completed ? 'bg-green-100 border-green-400' : 'hover:bg-teal-100 border-teal-400'
        }`}
        onDoubleClick={() => onDoubleClick(tasks)}
      >
        {/* Contenedor para el título y la descripción */}
        <div className="flex-1">
          {/* Título */}
          <p className="font-bold text-xl text-teal-700">
            {tasks.title}{" "}
            {tasks.completed ? (
              <span className="text-sm italic text-gray-600">(Completada)</span>
            ) : null}
          </p>

          {/* Descripción */}
          <p className="text-gray-600 mt-1">{tasks.description}</p>
        </div>

        {/* Botón para eliminar */}
        <Form method="post" className="ml-4">
          <input type="hidden" name="_method" value="DELETE" />
          <input type="hidden" name="taskId" value={tasks._id} />
          <button
            type="submit"
            className="bg-red-600 h-8 w-8 rounded-full text-white font-black flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors"
          >
            X
          </button>
        </Form>
      </div>

      {/* Tooltip personalizado */}
      <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded-md py-1 px-3 shadow-lg transform opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Doble click para actualizar tarea
      </div>
    </div>
    </>
  );
}
