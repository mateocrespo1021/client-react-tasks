import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useActionData,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import TaskForm from "../components/TaskForm";
import { getTaskById, updateTask } from "../services/TaskService";
import { Task } from "../types";

//Función que se ejecuta al cargar la vista
export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    //Obtenemos la task por su id
    try {
      const task = await getTaskById(+params.id);
      return task
    } catch (error) {
      console.log(error);
      return redirect(`/`);
    }
    
    
  }
}

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
    await updateTask(data, +params.id);
  }

  const projectId = data.projectId;

  return redirect(`/tasks/${projectId}/project`);
}

//
export default function EditTask() {
  const error = useActionData() as string;
  const task = useLoaderData() as Task;
  const location = useLocation();
  const projectId = location.state?.projectId;
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          Registar Proyectos
        </h2>
        <Link
          to={"/"}
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Volver a Proyectos
        </Link>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form method="POST" className="mt-10">
        <TaskForm task={task} />
        <input type="hidden" name="projectId" value={projectId} />
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Guardar Cambios"
        />
      </Form>
    </>
  );
}
