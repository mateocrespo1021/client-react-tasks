//Pagina de listar proyectos

import { Link, useLoaderData } from "react-router-dom";
import { getProjects } from "../services/ProjectService";
import { Project } from "../types";
import ProjectDetails from "../components/ProjectDetails";

//Función que se ejecuta al cargar la vista , carga los proyectos
export async function loader() {
  const projects = await getProjects();
  return projects;
}

export default function ListProject() {
  const projects = useLoaderData() as Project[];
 
  return (
    <div className="p-2">
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          Proyectos
        </h2>
        <Link
          to={"/project/new"}
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Agregar Proyecto
        </Link>
      </div>
      <table className="w-full mt-5 table-auto">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Descripción</th>
            <th className="p-2">Detalle</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <ProjectDetails
              key={project.projectId}
              project={project}
            ></ProjectDetails>
          ))}
        </tbody>
      </table>
    </div>
  );
}
