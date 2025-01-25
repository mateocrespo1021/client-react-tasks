import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useActionData,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProject } from "../services/ProjectService";
import ProjectForm from "../components/ProjectForm";

//Función que se ejecuta al enviar el formulario
export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son requeridos";
  }

  if (error.length) {
    return error;
  }

  await addProject(data);

  return redirect("/");
}

//Vista para registrar proyectos y para actualizar proyectos
export function NewProject() {
  const error = useActionData() as string;
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
        <ProjectForm />
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Proyecto"
        />
      </Form>
    </>
  );
}