import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { TasksComponent } from './app/tasks/tasks.component';
import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent,
    //movido a appconfigts
    // {
    //providers: [
        //provideRouter(//[aqui dentro se puede poner rutas q lleven a tal componente, lo comun es que el ruteo este en otra archivo separado
        // {
        //     path:'tasks', // eldominio/tasks
        //     component: TasksComponent
        // }] 
        //routes )
   //]}
   appConfig
).catch((err) => console.error(err));
