import {
  ActionFunctionArgs,
  Form,
  redirect,
  useNavigate,
} from "react-router-dom";
import { Task } from "../types";
import { deleteTaskById } from "../services/TaskService";

type TasksDetailsProps = {
  projectId: number; // Añades projectId
  tasks: Task[]; // Mantienes las tareas
};

//Función que se ejecuta al enviar el formulario  y eliminar una tarea
export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  const projectId = data.projectId;
  if (params.id !== undefined) {
    await deleteTaskById(+params.id);
  }
  return redirect(`/tasks/${projectId}/project`);
}

export default function TasksDetails({ tasks, projectId }: TasksDetailsProps) {
  const navigate = useNavigate();
  return (
    <>
      {tasks.map((task) => (
        <tr className="border-b " key={task.taskId}>
          <td className="p-3 text-lg text-gray-800">{task.title}</td>
          <td className="p-3 text-lg text-gray-800">{task.description}</td>
          <td className="p-3 text-lg text-gray-800">{task.status}</td>
          <td className="p-3 text-lg text-gray-800">
            <div className="flex gap-2 items-center">
              <button
                className="bg-indigo-600 text-white rounded-lg w-full p-3 uppercase font-bold text-xs text-center"
                onClick={() =>
                  navigate(`/tasks/${task.taskId}/edit`, {
                    state: { projectId },
                  })
                }
              >
                Editar
              </button>
              <Form
                className="w-full"
                method="POST"
                action={`/tasks/${task.taskId}/delete`}
                onSubmit={(e) => {
                  if (!confirm("¿Estás seguro de eliminar este proyecto?")) {
                    e.preventDefault();
                  }
                }}
              >
                <input
                  type="hidden"
                  name="projectId"
                  defaultValue={projectId}
                />
                <input
                  type="submit"
                  value="Eliminar"
                  className="bg-red-600 text-white rounded-lg w-full p-3 uppercase font-bold text-xs text-center"
                />
              </Form>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}
