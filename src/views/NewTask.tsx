import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useActionData,
} from "react-router-dom";
import TaskForm from "../components/TaskForm";
import ErrorMessage from "../components/ErrorMessage";
import { addTask } from "../services/TaskService";

//Función que se ejecuta al enviar el formulario
export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son requeridos";
  }

  if (error.length) {
    return error;
  }

  if (params.id !== undefined) {
    await addTask({ ...data, projectId: params.id });
  }

  return redirect(`/tasks/${params.id}/project`);
}

export default function NewTask() {
  const error = useActionData() as string;
  
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Registar Tarea</h2>
        <Link
          to={"/"}
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Volver al Proyecto
        </Link>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form method="POST" className="mt-10">
        <TaskForm />
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Tarea"
        />
      </Form>
    </>
  );
}
