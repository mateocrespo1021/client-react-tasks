import { Task } from "../types";

type TaskFormProps = {
  task?: Task;
};

export default function TaskForm({ task }: TaskFormProps) {
  return (
    <>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="name">
          Titulo de la Tarea:
        </label>
        <input
          id="name"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Titulo de la Tarea"
          name="title"
          defaultValue={task?.title}
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="description">
          Descripción:
        </label>
        <textarea
          id="description"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Descripción de la Tarea"
          name="description"
          defaultValue={task?.description}
        />
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="description">
            Status:
          </label>
          <select
            name="status"
            id="status"
            className="mt-2 block w-full p-3 bg-gray-50"
            defaultValue={task?.status}
          >
            <option value="">Selecciona un estado</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En progreso">En progreso</option>
            <option value="Completada">Completada</option>
          </select>
        </div>
      </div>
    </>
  );
}
