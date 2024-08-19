import { Routes } from "@angular/router";
import { resolveUserTasks, TasksComponent } from "./tasks/tasks.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import { canLeaveEditPageGuard } from "./guards/can-leave-edit-page.guard";

export const userRoutes : Routes= [//?estas rutas hijas tendran como base la ruta padre y de ahi a donde valla cada una
    {
        path: '',
        redirectTo: 'tasks',//podemos tambien redirigir asi
        pathMatch: 'prefix'//conincidencia de ruta 
    },
    {
        path: 'tasks', // dominip/users/<uid>/tasks
        component: TasksComponent,
        runGuardsAndResolvers: 'always',//paramsOrQueryParamsChange | necesario para cuando ocupemos el resolve y se vean actualizados loso datoss, nos asegurara que la funcion resolve.. sera re-ejecutada cada que los queryparams cambiend
        resolve: {
            userTasks: resolveUserTasks
        },
    },
    {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPageGuard]
    }//los hijos tienes acceso al parametro
]