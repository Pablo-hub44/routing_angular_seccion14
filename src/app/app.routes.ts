import { Route, Routes } from "@angular/router";
import { TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { userRoutes } from "./user.routes";

export const routes: Routes = [

    {
        path:'', //dominio/
        component: NoTaskComponent 
    },
    {
        path: 'users/:userId', // eldominio/users/<userId>
        component: UserTasksComponent, // por defecto, un componente solo puede obtener los parametros de ruta que pertenecen a su ruta, para q las hijas accedan a esos parametros hay que configurar en el appconfig
        children: userRoutes //lo pusimos en otro file para probar, 
    } ,
    {//*ruta de error, por si pone una pagina que no existe se mandara a aca, por eso son **
        path:'**',
        component:NotFoundComponent
    }

]