import {
  Link,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router-dom";
import { getProjectById } from "../services/ProjectService";
import { Project } from "../types";
import TasksDetails from "../components/TasksDetails";

//Función que se ejecuta al cargar la vista
export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    //Obtenemos el proyecto por su id
    try {
      const project = await getProjectById(+params.id);
      return project;
    } catch (error) {
      console.log(error);
      return redirect("/");
    }
  }
}

export default function ListTask() {
  const project = useLoaderData() as Project;
  return (
    <div className="p-2">
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          Proyecto {project.name}
        </h2>
        <div className="flex gap-2">
          <Link
            to={`/`}
            className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
          >
            Volver a Proyectos
          </Link>
          <Link
            to={`/tasks/${project.projectId}/new`}
            className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
          >
            Agregar Tarea
          </Link>
        </div>
      </div>
      <table className="w-full mt-5 table-auto">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="p-2">Titulo</th>
            <th className="p-2">Descripción</th>
            <th className="p-2">Status</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            <TasksDetails
              key={project.projectId}
              tasks={project.tasks}
              projectId={project.projectId}
            ></TasksDetails>
          }
        </tbody>
      </table>
    </div>
  );
}
