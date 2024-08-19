import { CanMatch, CanMatchFn, RedirectCommand, Route, Router, Routes } from "@angular/router";
// import { TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolvedUserName, resolveTitle, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
// import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { userRoutes } from "./user.routes";
import { inject } from "@angular/core";

//un guard, claro que deberia estar en su propio archivo
const dummyCanMatch: CanMatchFn = (route,segments) => {
    const _router = inject(Router);//inyectamos router para manejar las redirecciones de pagina
    const deberiaTenerAcceso = Math.random();
    if (deberiaTenerAcceso < 0.5) {
        return true;
    }
    //varias formas
    // return false;
    return new RedirectCommand(_router.parseUrl('/unauthorized'));
    //return _router.navigate(['/']);//si  hay, que nos rediriga a la ruta que sea / home
}

export const routes: Routes = [

    {
        path:'', //dominio/
        component: NoTaskComponent ,
        title: 'Ninguna tarea seleccionada'
    },
    {
        path: 'users/:userId', // eldominio/users/<userId>
        component: UserTasksComponent, // por defecto, un componente solo puede obtener los parametros de ruta que pertenecen a su ruta, para q las hijas accedan a esos parametros hay que configurar en el appconfig

        //children: userRoutes, //lo pusimos en otro file para probar, //* rutas hijas 
        //!con lazy loading a todas las rutas hijas :)
        loadChildren: ()=> import('./user.routes').then(mod => mod.userRoutes),
        data:{
            message:'Hellou'//se puede agregar tambien data estatica a la ruta pd no muy usado 
        },
        resolve:{//para conseguir datos desde aqui, claro crear sus funciones , eje este esta en user-task-component
            userName: resolvedUserName,//invacamos pero no ejecutamos nuestra funcion aqui
        },
        title: resolveTitle, //con esto ahora se resolvera dinamicamente el titulo de la pagina
        canMatch: [
            //dummyCanMatch de prueba
        ],
    } ,
    {//*ruta de error, por si pone una pagina que no existe se mandara a aca, por eso son **
        path:'**',
        component:NotFoundComponent
    }

]


