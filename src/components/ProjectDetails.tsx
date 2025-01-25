import {
  ActionFunctionArgs,
  Form,
  redirect,
  useNavigate,
} from "react-router-dom";
import { Project } from "../types";
import { deleteProjectById } from "../services/ProjectService";

type ProjectDetailsProps = { project: Project };

//Función que se ejecuta al enviar el formulario  y eliminar un proyecto
export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProjectById(+params.id);
  }
  return redirect("/");
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const navigate = useNavigate();
  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{project.name}</td>
      <td className="p-3 text-lg text-gray-800">{project.description}</td>
      <td className="p-3 text-lg text-gray-800">
        <button
          onClick={() => navigate(`tasks/${project.projectId}/project`)}
          className="text-black rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer"
        >
          Detalle
        </button>
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          <button
            className="bg-indigo-600 text-white rounded-lg w-full p-3 uppercase font-bold text-xs text-center"
            onClick={() => navigate(`project/${project.projectId}/edit`)}
          >
            Editar
          </button>
          <Form
            className="w-full"
            method="POST"
            action={`/project/${project.projectId}/delete`}
            onSubmit={(e) => {
              if (!confirm("¿Estás seguro de eliminar este proyecto?")) {
                e.preventDefault();
              }
            }}
          >
            <input
              type="submit"
              value="Eliminar"
              className="bg-red-600 text-white rounded-lg w-full p-3 uppercase font-bold text-xs text-center"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}
