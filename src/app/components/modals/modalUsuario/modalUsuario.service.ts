import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { Plan } from 'src/app/models/plan.model';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class ModalUsuarioService {

  usuario: Usuario;

  oculto: string = 'oculto';

  notificacion = new EventEmitter<any>();

  constructor(
  ) {
    this.usuario = new Usuario(null,null,null,new Plan(null,null),null,null);
   }

  ocultarModal(){
    this.oculto = 'oculto';
    this.usuario = new Usuario(null,null,null, new Plan(null,null),null,null);
  }

  mostrarModal(usuario: Usuario){

    if (localStorage.getItem('id') === usuario._id){
      swal('No puede Editar este usuario', 'No se puede editar a su mismo usuario.', 'error');
    } else {
      this.oculto = '';
      this.usuario = usuario;
    }

  }

}
