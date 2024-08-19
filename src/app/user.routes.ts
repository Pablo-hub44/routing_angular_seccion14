import { Routes } from "@angular/router";
//import { resolveUserTasks } from "./tasks/tasks.component";  //TasksComponent
import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import { canLeaveEditPageGuard } from "./guards/can-leave-edit-page.guard";
import { resolveUserTasks } from "./resolvers/resolveUserTasks";
import { TasksComponent } from "./tasks/tasks.component";

export const userRoutes: Routes = [//?estas rutas hijas tendran como base la ruta padre y de ahi a donde valla cada una
    {
        path: '',
        redirectTo: 'tasks',//podemos tambien redirigir asi
        pathMatch: 'prefix'//conincidencia de ruta 
    },
    {
        path: 'tasks', // dominip/users/<uid>/tasks
        component: TasksComponent, //ahora load component //!el lazy loading
        // loadComponent: () => import('./tasks/tasks.component').then(mod => mod.TasksComponent),//al poner el loadcomponent aqui solo cuando      cargue el componente se ejecute|active, para acceder al componente es con un .then



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