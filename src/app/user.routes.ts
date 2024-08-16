import { Routes } from "@angular/router";
import { TasksComponent } from "./tasks/tasks.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";

export const userRoutes : Routes= [//?estas rutas hijas tendran como base la ruta padre y de ahi a donde valla cada una
    {
        path: '',
        redirectTo: 'tasks',//podemos tambien redirigir asi
        pathMatch: 'prefix'//conincidencia de ruta 
    },
    {
        path: 'tasks', // dominip/users/<uid>/tasks
        component: TasksComponent
    },
    {
        path: 'tasks/new',
        component: NewTaskComponent
    }//los hijos tienes acceso al parametro
]