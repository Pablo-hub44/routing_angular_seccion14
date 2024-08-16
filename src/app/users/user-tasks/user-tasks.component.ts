import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { User } from '../user/user.model';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

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

  //conseguimos el usuario del service
  private userService = inject(UsersService);
  private destroyRef = inject(DestroyRef);

  //?con computed siempre va a estar escucahndo este callback para la propiedad userName, en la cual buscaremos el id validando que el userid(conseguido del componente padre)  sea alguno de la lista de users -> conseguimos el nombre
  //? userName = computed(() => { 
  //   const user =  this.userService.users.find(u => u.id === this.userId()) 
  //   return user ? user.name : '';
  // });



  ngOnInit(): void {
    console.log(this.activatedRoute);
    console.log(this.activatedRoute.snapshot.paramMap.get('userId'));//consigues el dato pero no es reactivo(no se actualizada rapidamente)
    console.log(this.activatedRoute);
    const subscription =  this.activatedRoute.paramMap.subscribe({
      //buscamos el user validando el que conseguimos por parametro userId puesto en rutas
      next: paramMap => {
        this.userName = this.userService.users.find(u => u.id == paramMap.get('userId'))?.name || '';
      }
    });

    //cerramos la subscripcion
    this.destroyRef.onDestroy(()=> subscription.unsubscribe)
  }
}
