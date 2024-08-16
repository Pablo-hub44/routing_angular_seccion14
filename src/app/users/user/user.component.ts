import { Component, computed, input } from '@angular/core';

import { type User } from './user.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  imports: [RouterLink, RouterLinkActive]
})
export class UserComponent {
  user = input.required<User>();//signal

  //
  imagePath = computed(() => 'users/' + this.user().avatar);
  /**
   * crea una ruta de imagen que se actualiza automáticamente si cambia el avatar del usuario. Esta ruta puede ser utilizada para mostrar la imagen correspondiente del usuario en tu aplicación.
   
  computed: Esta función crea un valor derivado que se recalcula automáticamente cada vez que cambia cualquiera de los datos que utiliza. Es decir, el valor que se obtiene de esta función se mantiene actualizado en todo momento si this.user().avatar cambia.*/
}
