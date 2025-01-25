import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { getProjectById, updateProject } from "../services/ProjectService";
import { Project } from "../types";
import ProjectForm from "../components/ProjectForm";

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

    // console.log(project);
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
    await updateProject(data, +params.id);
  }

  return redirect("/");
}

//Vista para registrar proyectos y para actualizar proyectos
export default function EditProject() {
  const error = useActionData() as string;
  const project = useLoaderData() as Project;
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Editar Proyecto</h2>
        <Link
          to={"/"}
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Volver a Proyectos
        </Link>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form method="POST" className="mt-10">
        <ProjectForm project={project}></ProjectForm>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Guardar Cambios"
        />
      </Form>
    </>
  );
}
