import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { RouterLink, ActivatedRoute, ResolveFn } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit{


  userId = input.required<string>();//escuchamos el user id emitido 

  // order = input<'asc'|'desc'>(); con signal
  //order?: 'asc' | 'desc'; sin signal
  order = signal<'asc'|'desc'>('desc');

  private taskService = inject(TasksService);
  private activatedRoute = inject(ActivatedRoute);
  private destoryRef = inject(DestroyRef);
  //userTasks: Task[] = [];

  //*traemos las tareas del usuario del service y filtrando por las que son de tal usuario, todo esto envuelto con un computed para que escuche cambios pk sino no escuchara el signal
  userTasks = computed(()=>{
    return this.taskService
    .allTasks()
    .filter((task)=> {return task.userId === this.userId()})
    .sort((a,b)=>{
      //validamos si orden es desc , mayor a menor, sino asc menor a mayor
      if (this.order() === 'desc') {
        return a.id > b.id ? -1 : 1;
      } else {
        return a.id > b.id ? 1 : -1;
      }
    })
  })

  ngOnInit(): void {
    const subscription = this.activatedRoute.queryParams.subscribe({
      next: params => { 
        //return this.order = params['orden']
        //return this.order = params['orden']
        return this.order.set( params['orden'])
      }
    });

    //cerramos la subscripcion
    this.destoryRef.onDestroy(()=> subscription.unsubscribe())
  }



}

//otro export donde conseguimos los usuarios 
export const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRouteSnapshot,
  routerState
) => {
  const order = activatedRouteSnapshot.queryParams['orden'];//conseguimoso el parametro orden
  const tasksService = inject(TasksService);
  const tasks = tasksService
    .allTasks()
    .filter(
      (task) => task.userId === activatedRouteSnapshot.paramMap.get('userId')
    );

    //validamos si orden es ascendente o descendente
  if (order && order === 'asc') {
    tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
  }

  return tasks.length ? tasks : [];
};