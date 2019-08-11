import { Component, OnInit } from '@angular/core';
import { ModalReservaAdmCrearService } from './modalReservaAdmCrear.service';
import { ReservaService } from '../../../services/reserva/reserva.service';
import { ClaseService } from '../../../services/clase/clase.service';
import { Clase } from 'src/app/models/clase.model';
import swal from 'sweetalert';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { Reserva } from 'src/app/models/reserva.model';

@Component({
  selector: 'app-modal-reserva-adm-crear',
  templateUrl: './modalReservaAdmCrear.component.html',
  styles: []
})
export class ModalReservaAdmCrearComponent implements OnInit {

  clase: Clase;
  usuarios: Usuario[] = [];
  cargando: boolean = true;
  desde: number = 0;
  totalRegistros: number = 0;

  constructor(public _modalService: ModalReservaAdmCrearService,
              public _reservaService: ReservaService,
              public _claseService: ClaseService,
              public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarUsuarios();

  }

  buscarClasePorFechaYHora(horaInicio: string, fecha: string){

    this._claseService.cargarClasePorFecha(fecha, horaInicio).subscribe((resp: any) =>{
      this.cargarClase(resp.clases);
    });

  }

  cargarClase(clase: any){
    this.clase = clase;
  }

  crearReserva(usuario: Usuario){

    if(this._modalService.clase.cupo >= 1){

      let reserva = new Reserva(usuario,this._modalService.clase, this._modalService.clase.fecha);

      this._reservaService.crearReserva(reserva)
        .subscribe( resp => {
          this._modalService.notificacion.emit(resp);
        });
    } else {
      swal('No se puede realizar la reserva', 'No existe clase para este horario o no hay cupo.', 'error');
    }

    this._modalService.ocultarModal();

  }

  cargarUsuarios(){
  
    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde)
                          .subscribe((resp: any) =>{
                            this.totalRegistros = resp.total;
                            this.usuarios = resp.usuarios;
                            this.cargando = false;
                          });
  }

  cambiarDesde(valor: number){
    let nuevoDesde = this.desde + valor;

    if(nuevoDesde >= this.totalRegistros){
      return;
    }
    if(nuevoDesde < 0){
      return;
    }
    this.desde = this.desde + valor;

    this.cargarUsuarios();
  }

  buscarUsuario(termino: string){

    if(termino.length <= 0){
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios(termino)
                          .subscribe((resp: any) =>{
                            this.usuarios = resp.usuarios;
                            this.cargando = false;
                          });
  }

}
