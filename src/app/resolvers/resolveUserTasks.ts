import { ResolveFn } from "@angular/router";
import { Task } from "../tasks/task/task.model";
import { inject } from "@angular/core";
import { TasksService } from "../tasks/tasks.service";

//otro export donde conseguimos las tareas de los usuarios 
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