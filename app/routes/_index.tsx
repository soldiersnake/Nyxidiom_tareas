import type { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";

import { connectDb } from "~/utils/db.server";
import Task from "~/models/task";
import { useLoaderData } from "@remix-run/react";
import TaskForm from "~/components/TaskForm";
import { Header } from "~/components/Header";
import { TaskType } from "~/types";
import Tasks from "~/components/Tasks";

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
  return (
    <>
      <Header/>
      <main className=" max-w-7xl mx-auto my-20 grid md:grid-cols-2">
        <div className="p-5">
          <h2 className="text-4xl font-black">Nueva Tarea</h2>
          <TaskForm/>
        </div>
        <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
          {tasks.length ? (
            <>
              <div className="space-y-3 mt-10">
                {tasks.map((item:TaskType)=> (
                  <Tasks key={item._id} tasks={item}/>
                ))}
              </div>
            </>
          ) : (
            <p className='text-center'>La lista de tareas esta vacia</p>
          )}
        </div>
      </main>
    </>
  );
}
