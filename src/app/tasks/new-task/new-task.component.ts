import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');

  submitted = false;
  //inyeccion de dependencias
  private tasksService = inject(TasksService);
  private router = inject(Router);//para poder regiridir a otras paginas

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );
    this.submitted = true;

    //redirigimos a la pagina del usuario
    this.router.navigate(['/users',this.userId(), 'tasks'],{
      replaceUrl: true,//con esto se asegura que si esta reemplazando la ruta, no muy usado 

    })
  }
}
