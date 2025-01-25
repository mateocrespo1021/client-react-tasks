import { Project } from "../types";

type ProjectFormProps = {
    project?: Project;
}
export default function ProjectForm({project}:ProjectFormProps) {
    return (
      <>
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="name">
            Nombre del Proyecto:
          </label>
          <input
            id="name"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Nombre del Proyecto"
            name="name"
            defaultValue={project?.name}
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="description">
            Descripción:
          </label>
          <textarea
            id="description"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Descripción del Proyecto"
            name="description"
            defaultValue={project?.description}
          />
        </div>
      </>
    );
}