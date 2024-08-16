import { ApplicationConfig } from "@angular/core";
import { provideRouter, withComponentInputBinding, withRouterConfig } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
    providers:[
        provideRouter(routes, withComponentInputBinding(), withRouterConfig({paramsInheritanceStrategy:'always'})),
    ]
}

//withRouterConfig con este le decimos que las  o los parametros q tenga el ruta padre se los pase tambien a las rutas hijas por si lo quieren ocupar
//es necesario ponerlo porque por defecto esta deshabilitado