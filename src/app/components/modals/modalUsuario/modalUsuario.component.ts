import { Component, OnInit } from '@angular/core';
import { ModalUsuarioService } from './modalUsuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Plan } from 'src/app/models/plan.model';
import { PlanService } from 'src/app/services/plan/plan.service';
import swal from 'sweetalert';
import { SubirArchivoService } from '../../../services/subirArchivo/subir-archivo.service';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modalUsuario.component.html',
  styles: []
})
export class ModalUsuarioComponent implements OnInit {

  formaC: FormGroup;
  planes: Plan[] = [];
  imagenSubir: File;
  imagenTemp: any;

  constructor(
    public _modalService: ModalUsuarioService,
    public _subirArchivoService: SubirArchivoService,
    public _planService: PlanService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit(
  ) {
    this.formaC = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      planC: new FormControl(null, Validators.required),
      cedula: new FormControl(null, Validators.required)
    });

    this.cargarPlanes();
  }

  cargarPlanes() {
    this._planService.cargarPlanes(0)
                      .subscribe((resp: any) =>{
                        this.planes = resp.planes;
                        console.log(resp);
                      });
  }

  seleccionImagen( archivo: File ){

    if(!archivo){
      this.imagenSubir = null;
      return;
    }

    if(archivo.type.indexOf('image') < 0){
      swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  actualizarUsuario(){

    let nuevoNombre: string;
    let nuevoEmail: string;
    let nuevaCedula: string;
    let nuevoPlan: any;

    if(this.formaC.value.nombre){
      nuevoNombre = this.formaC.value.nombre;
    }else{
      nuevoNombre = this._modalService.usuario.nombre;
    }
    if(this.formaC.value.email){
      nuevoEmail = this.formaC.value.email;
    }else{
      nuevoEmail = this._modalService.usuario.email;
    }
    if(this.formaC.value.planC){
      nuevoPlan = this.formaC.value.planC;
    }else{
      nuevoPlan = this._modalService.usuario.plan;
    }
    if(this.formaC.value.cedula){
      nuevaCedula = this.formaC.value.cedula;
    }else{
      nuevaCedula = this._modalService.usuario.cedula;
    }
    console.log(this.formaC.value.cedula);

    let usuario = new Usuario(nuevoNombre,
                              nuevoEmail, 
                              null,
                              nuevoPlan,
                              nuevaCedula,
                              null);
    
    usuario._id = this._modalService.usuario._id;

    this._usuarioService.actualizarUsuario(usuario).subscribe(resp =>{
      this._modalService.notificacion.emit(resp);
    });

    if(this.imagenSubir) {
      this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalService.usuario._id)
                              .then((resp: any) =>{
                                this._modalService.notificacion.emit(resp);
                              })
                              .catch(resp =>{
                                console.log(resp);
                              });
    }
    this._modalService.ocultarModal();
  }


}
