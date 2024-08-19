import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { User } from '../user/user.model';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterState, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink]
})
export class UserTasksComponent implements OnInit{
  


  //user = input.required<User>();//signal
  //?userId = input.required<string>();//como lo pusimos de parametro url, es un signal

  userName = '';

  //*otra manera de conseguir el parametro sin usar signal seria con activatedRoute que nos regresaria varios datos de la ruta
  //esta es la menera que uso
  private activatedRoute = inject(ActivatedRoute)
  /**
   * @Input()
set userId(uid: string) {
  console.log(uid);
}
   */

  
  message = input.required<string>();//para probar el dato puesto en la ruta.
  //conseguimos el usuario del service
  private userService = inject(UsersService);
  private destroyRef = inject(DestroyRef);

  //?con computed siempre va a estar escucahndo este callback para la propiedad userName, en la cual buscaremos el id validando que el userid(conseguido del componente padre)  sea alguno de la lista de users -> conseguimos el nombre
  //? userName = computed(() => { 
  //   const user =  this.userService.users.find(u => u.id === this.userId()) 
  //   return user ? user.name : '';
  // });



  ngOnInit(): void {
    console.log('Input Data: '+this.message());
    
    console.log(this.activatedRoute);
    console.log(this.activatedRoute.snapshot.paramMap.get('userId'));//consigues el dato pero no es reactivo(no se actualizada rapidamente)
    console.log(this.activatedRoute);
    const subscription =  this.activatedRoute.paramMap.subscribe({
      //buscamos el user validando el que conseguimos por parametro userId puesto en rutas
      next: paramMap => {
        this.userName = this.userService.users.find(u => u.id == paramMap.get('userId'))?.name || '';
      }
    });

    //conseguir el username de la ruta para conocer
    // this.activatedRoute.data.subscribe({
    //   next: data =>{
    //     console.log(data);//aqui dentro estaria el userName
        
    //   }
    // })

    //cerramos la subscripcion
    this.destroyRef.onDestroy(()=> subscription.unsubscribe)
  }

  
}

//metodo para el parametro revolse en las rutas, cuando hacemos un lambda function podemos ponerle el tipo de dato
export const  resolvedUserName : ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot)=>{
    const userService = inject(UsersService);
    const userName = userService.users.find(u => u.id == activatedRoute.paramMap.get('userId'))?.name || '';

    return userName;//retornamos el nombre del usuario
}

//otro metodo para el otro resolve
export const resolveTitle: ResolveFn<string> = (activatedRoute,routerState)=>{
  //reutiliizamos nuestro metodo de arriba
return resolvedUserName(activatedRoute,routerState) + '\'s tareas'

/**
 * La función resolveTitle es una manera eficiente de pre-resolver datos antes de cargar una ruta en Angular, asegurando que ciertos datos estén disponibles de inmediato al entrar en una ruta específica. En este caso, se construye un título basado en el nombre del usuario que se obtiene dinámicamente.
 * 
 * activatedRoute: Es una instancia de ActivatedRouteSnapshot, que proporciona acceso a información sobre la ruta que se está activando, incluyendo parámetros de ruta, datos, etc.
routerState: Es una instancia de RouterStateSnapshot, que ofrece una imagen del estado completo del router en un momento determinado.
 */
}
  

