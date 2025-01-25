import { safeParse } from "valibot";
import { DraftTaskSchema, DraftUpdateTaskSchema, Task, TaskSchema } from "../types";
import axios from "axios";

type TaskData = {
  [k: string]: FormDataEntryValue;
};

export async function addTask(data: TaskData) {
  try {
    //Validamos los datos , usamos valibot y mapeamos los datos
    const result = safeParse(DraftTaskSchema, {
      title: data.title,
      description: data.description,
      status: data.status,
      projectId: +data.projectId,
    });

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/task`;
      await axios.post(url, {
        title: result.output.title,
        description: result.output.description,
        status: result.output.status,
        projectId: result.output.projectId,
      });
    } else {
      throw new Error("Error en la validación de los datos");
    }
  } catch (error) {
    throw new Error("Error" + error);
  }
}

export async function updateTask(data: TaskData, id: Task["taskId"]) {
  try {
    //Validamos los datos , usamos valibot y mapeamos los datos
    const result = safeParse(DraftUpdateTaskSchema, {
      title: data.title,
      description: data.description,
      status: data.status,
    });

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/task/${id}`;
      await axios.put(url, {
        title: result.output.title,
        description: result.output.description,
        status: result.output.status,
      });
    } else {
      throw new Error("Error en la validación de los datos");
    }
  } catch (error) {
    throw new Error("Error" + error);
  }
}

export async function getTaskById(id: Task["taskId"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/task/${id}`;
    const { data } = await axios.get(url);
    //Validamos los datos , usamos valibot y mapeamos los datos
    const result = safeParse(TaskSchema, data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Error en la validación de los datos");
    }
  } catch (error) {
    throw new Error("Error" + error);
  }
}


//Eliminamos una tarea por su id
export async function deleteTaskById(id:Task["taskId"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/task/${id}`;
    await axios.delete(url);
  } catch (error) {
    throw new Error("Error" + error);
  }
}