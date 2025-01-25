import { createBrowserRouter } from "react-router-dom";
import ListProject, { loader as projectsLoader } from "./views/ListProject";
import { action as newProjectAction, NewProject } from "./views/NewProject";
import Layout from "./layout/Layout";
import EditProject, {
  loader as editProjectLoader,
  action as editProjectAction,
} from "./views/EditProject";
import { action as deleteProjectAction } from "./components/ProjectDetails";
import ListTask, { loader as tasksLoader } from "./views/ListTask";
import NewTask, { action as newTaskAction } from "./views/NewTask";
import EditTask, {
  action as editTaskAction,
  loader as taskLoader,
} from "./views/EditTask";
import {action as deleteTaskAction} from "./components/TasksDetails";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ListProject></ListProject>,
        loader: projectsLoader,
      },
      {
        path: "project/new",
        element: <NewProject />,
        action: newProjectAction,
      },
      {
        path: "project/:id/edit",
        element: <EditProject />,
        loader: editProjectLoader,
        action: editProjectAction,
      },
      {
        path: "project/:id/delete",
        action: deleteProjectAction,
      },
      {
        path: "tasks/:id/project",
        element: <ListTask></ListTask>,
        loader: tasksLoader,
      },
      {
        path: "tasks/:id/new",
        element: <NewTask />,
        action: newTaskAction,
      },
      {
        path: "tasks/:id/edit",
        element: <EditTask />,
        action: editTaskAction,
        loader: taskLoader,
      },
      {
        path: "tasks/:id/delete",
        action: deleteTaskAction,
      }
    ],
  },
]);
