import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";

import { connectDb } from "../utils/db.server";
import Task from "../models/task";
import { useLoaderData } from "@remix-run/react";
import TaskForm from "../components/TaskForm";
import { TaskType } from "../types/index";
import Tasks from "../components/Tasks";
import { Header } from "../components/Header";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Mariano Macias" },
    { name: "description", content: "Welcome a Mi Prueba Tecnica!" },
  ];
};

export let loader: LoaderFunction = async (): Promise<TaskType[]> => {
  try {
    await connectDb();
    const tasks: TaskType[] = await Task.find();
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks", error);
    throw new Error("Error loading tasks");
  }
};

export let action: ActionFunction = async ({ request }) => {
  await connectDb();
  const formData = await request.formData();

  // Para eliminar Task, capturamos el metodo DELETE
  const method = formData.get("_method");
  const taskId = formData.get("taskId");
  if (method === "DELETE" && typeof taskId === "string") {
    await Task.findByIdAndDelete(taskId);
    return null;
  }

  // Actualizar tarea
  if (method === "UPDATE" && typeof taskId === "string") {
    const title = formData.get("title");
    const description = formData.get("description");
    const completed = formData.get("completed") === "on";

    await Task.findByIdAndUpdate(taskId, {
      title,
      description,
      completed,
    });

    return null;
  }

  // Obtenemos los valores del formulario
  const title = formData.get("title");
  const description = formData.get("description");
  const completed = formData.get("completed") === "on"; // Si está marcado, es true
  // Validaciones del formualrio
  if (typeof title === "string") {
    await Task.create({ title, description, completed });
  }

  return null;
};

export default function Index() {
  let tasks = useLoaderData<TaskType[]>();
  console.log("Tasks cargadas:", tasks);

  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null); // Estado para la tarea seleccionada

  // Función para mostrar notificaciones de toastify
  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    toast(message, {
      type: type,
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <>
      <Header /> {/* Componente de cabecera */}
      <ToastContainer /> {/* Contenedor de notificaciones */}
      <main className=" max-w-7xl mx-auto my-20 grid md:grid-cols-2">
        <div className="p-5">
          <h2 className="text-4xl font-black">Nueva Tarea</h2>
          <TaskForm
            selectedTask={selectedTask}
            onSubmit={() => {
              setSelectedTask(null);
              showToast(
                selectedTask
                  ? "Tarea actualizada correctamente"
                  : "Tarea creada correctamente"
              );
            }}
          />
        </div>
        <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
          {tasks.length ? (
            <>
              <div className="space-y-3 mt-10">
                {tasks.map((item: TaskType) => (
                  <Tasks
                    key={item._id}
                    tasks={item}
                    onDoubleClick={setSelectedTask}
                    onDelete={() => showToast("Tarea eliminada correctamente")}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="text-center">La lista de tareas esta vacia</p>
          )}
        </div>
      </main>
    </>
  );
}
