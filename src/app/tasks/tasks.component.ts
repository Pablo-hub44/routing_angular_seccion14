import { Component, computed, inject, input } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {

  userId = input.required<string>();//escuchamos el user id emitido 

  private taskService = inject(TasksService)

  //userTasks: Task[] = [];

  //traemos las tareas del usuario del service y filtrando por las que son de tal usuario, todo esto envuelto con un computed para que escuche cambios pk sino no escuchara el signal
  userTasks = computed(()=>{
    return this.taskService.allTasks().filter((task)=> {return task.userId === this.userId()})
  })



}
