import { array, number, object, string, InferOutput } from "valibot";

export const DraftProjectSchema = object({
  name: string(),
  description: string(),
});

export const DraftTaskSchema = object({
  title: string(),
  description: string(),
  status: string(),
  projectId: number(),
});

export const DraftUpdateTaskSchema = object({
  title: string(),
  description: string(),
  status: string()
});


export const TaskSchema = object({
  taskId: number(),
  title: string(),
  description: string(),
  status: string(),
  
});

export const ProjectSchema = object({
  projectId: number(),
  name: string(),
  description: string(),
  tasks: array(TaskSchema),
});
export const ProjectsSchema = array(ProjectSchema);
export type Project = InferOutput<typeof ProjectSchema>;
export type Task = InferOutput<typeof TaskSchema>;
