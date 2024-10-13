import type { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import Tasks from "./task";
import { connectDb } from "~/utils/db.server";
import Task from "~/models/task";
import { useLoaderData } from "@remix-run/react";
import { Header } from "~/components/header";

export const meta: MetaFunction = () => {
  return [
    { title: "Mariano Macias" },
    { name: "description", content: "Welcome a Mi Prueba Tecnica!" },
  ];
};

export let loader: LoaderFunction = async () => {
  try {
    await connectDb();
    const tasks = await Task.find();
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks", error);
    throw new Error("Error loading tasks");
  }
};

export let action: ActionFunction = async ({ request }) => {
  await connectDb();
  const formData = await request.formData();
  const title = formData.get("title");

  if (typeof title === "string") {
    await Task.create({ title });
  }

  return null;
};

export default function Index() {
  
  let tasks:any = useLoaderData();
  console.log("Tasks cargadas:", tasks); // Log para ver qué se está obteniendo
  return (
    <>
      <Header/>
      <main className=" max-w-7xl mx-auto my-20 grid md:grid-cols-2">
        <div className="p-5">
          <h2 className="text-4xl font-black">Nueva Tarea</h2>
          <p>test 1</p>
        </div>
        <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
          {tasks.length ? (
            <>
              <div className="space-y-3 mt-10">
                {tasks.map((item:any)=> (
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
