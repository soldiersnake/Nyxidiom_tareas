import { useLoaderData, Form } from "@remix-run/react";
import { LoaderFunction, ActionFunction } from "@remix-run/node";
import { connectDb } from "~/utils/db.server";
import Task from "~/models/task";


export default function Tasks() {

  return (
    <div>
      <h1>Tasks</h1>
      {/* <ul>
        {tasks.map((task: any) => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul> */}
      <Form method="get">
        <input type="text" name="title" placeholder="Task title" />
        <button type="submit">Add Task</button>
      </Form>
    </div>
  );
}
