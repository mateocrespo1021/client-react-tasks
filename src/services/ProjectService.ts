import { safeParse } from "valibot";
import { DraftProjectSchema, Project, ProjectSchema, ProjectsSchema } from "../types";
import axios from "axios";

type ProjectData = {
  [k: string]: FormDataEntryValue;
};


//Obtemos todos los proyectos
export async function getProjects() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/project`;
    const { data } = await axios.get(url);
    //Validamos los datos , usamos valibot y mapeamos los datos
    const result = safeParse(ProjectsSchema, data);
     console.log(result);
    
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Error en la validación de los datos");
    }
  } catch (error) {
   throw new Error("Error" + error);
  }
}

//Obtenemos un proyecto por su id
export async function getProjectById(id:Project["projectId"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/project/${id}`;
    const { data } = await axios.get(url);
    //Validamos los datos , usamos valibot y mapeamos los datos
    const result = safeParse(ProjectSchema, data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Error en la validación de los datos");
    }
  } catch (error) {
   throw new Error("Error" + error);
  }
}

export async function addProject(data: ProjectData) {
  try {
    const result = safeParse(DraftProjectSchema, {
      name: data.name,
      description: data.description,
    });

    console.log(result);
    
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/project`;
       await axios.post(url, {
        name: result.output.name,
        description: result.output.description,
      });
    } else {
      throw new Error("Error en la validación de los datos");
    }
  } catch (error) {
    throw new Error("Error" + error);
  }
}


export async function updateProject(data: ProjectData , id:Project["projectId"]) {  
  try {
    const result = safeParse(DraftProjectSchema, {
      name: data.name,
      description: data.description,
    });
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/project/${id}`;
      await axios.put(url, {
        name: result.output.name,
        description: result.output.description,
      });
    } else {
      throw new Error("Error en la validación de los datos");
    }
  } catch (error) {
    throw new Error("Error" + error);
  }
}


//Eliminamos un proyecto por su id
export async function deleteProjectById(id:Project["projectId"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/project/${id}`;
    await axios.delete(url);
  } catch (error) {
    throw new Error("Error" + error);
  }
}