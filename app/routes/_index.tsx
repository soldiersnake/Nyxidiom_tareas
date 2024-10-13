import type { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import Tasks from "./task";
import { connectDb } from "~/utils/db.server";
import Task from "~/models/task";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Formulario" },
    { name: "description", content: "Welcome to Remix!" },
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
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <Tasks/>
      </div>
    </div>
  );
}
