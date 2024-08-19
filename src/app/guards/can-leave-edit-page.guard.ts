import { CanDeactivateFn } from '@angular/router';
import { NewTaskComponent } from '../tasks/new-task/new-task.component';

/**
 * funciona para validar pagina de nueva tarea si tiene acceso para editar una task q no es suya
 * @param component 
 * @param currentRoute 
 * @param currentState 
 * @param nextState 
 * @returns 
 */
export const canLeaveEditPageGuard: CanDeactivateFn<NewTaskComponent> = (component, currentRoute, currentState, nextState) => {

  if (component.submitted) {
    return true;
  }

  if (component.enteredTitle() || component.enteredDate(), component.enteredSummary() ) {
    return window.confirm('Te gustaria salir? Perderas la informacion ingresada.');
  }
  return true;

  //siempre devolvera true a menos q el usuario ingrese datos se le abrira una ventana de cofirmaciom

};
