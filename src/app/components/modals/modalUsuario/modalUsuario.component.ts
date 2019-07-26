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
      cedula: new FormControl(null, Validators.required),
      fechaNacimiento: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required),
      direccion:  new FormControl(null, Validators.required),
      rh: new FormControl(null,Validators.required),
      nombreContacto: new FormControl(null, Validators.required),
      telefonoContacto: new FormControl(null, Validators.required),
      descuento: new FormControl(null, Validators.required),
      porcentajeDescuento: new FormControl(null, Validators.maxLength(3))
    });

    this.cargarPlanes();
    
  }

  cargarPlanes() {
    this._planService.cargarPlanes(0)
                      .subscribe((resp: any) =>{
                        this.planes = resp.planes;
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
    let nuevaCedula: string;
    let nuevoEmail: string;
    let nuevoTelefono: string;
    let nuevaDireccion: string;
    let nuevaFechaNaciemiento: string;
    let nuevoRH: string;
    let nuevoPlan: any;
    let nuevoNombreContacto: string;
    let nuevoTelefonoContacto: string;
    let nuevoDescuento: boolean;
    let nuevoPorcentajeDescuento: number;
    let nuevoTotalValorPlan: number;
    

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

    if(this.formaC.value.fechaNacimiento){
      nuevaFechaNaciemiento = this.formaC.value.fechaNacimiento;
    }else{
      nuevaFechaNaciemiento = this._modalService.usuario.fechaNacimiento;
    }

    if(this.formaC.value.telefono){
      nuevoTelefono = this.formaC.value.telefono;
    }else{
      nuevoTelefono = this._usuarioService.usuario.telefono;
    }

    if(this.formaC.value.direccion){
      nuevaDireccion = this.formaC.value.direccion;
    }else{
      nuevaDireccion = this._modalService.usuario.direccion;
    }

    if(this.formaC.value.rh){
      nuevoRH = this.formaC.value.rh;
    }else{
      nuevoRH = this._modalService.usuario.rh;
    }

    if(this.formaC.value.nombreContacto){
      nuevoNombreContacto = this.formaC.value.nombreContacto;
    }else{
      nuevoNombreContacto = this._modalService.usuario.nombreContacto;
    }

    if(this.formaC.value.telefonoContacto){
      nuevoTelefonoContacto = this.formaC.value.telefonoContacto;
    }else{
      nuevoTelefonoContacto = this._modalService.usuario.telefonoContacto;
    }

    if(this.formaC.value.descuento){
      nuevoDescuento = this.formaC.value.descuento;
    }else{
      nuevoDescuento = this._modalService.usuario.descuento;
    }

    if(nuevoDescuento){
      if(this.formaC.value.porcentajeDescuento){
        nuevoPorcentajeDescuento = this.formaC.value.porcentajeDescuento;
        nuevoTotalValorPlan = this._modalService.usuario.plan.valor - ((nuevoPorcentajeDescuento/100) * this._modalService.usuario.plan.valor);
      }else{
        nuevoPorcentajeDescuento = this._modalService.usuario.porcentajeDescuento;
        nuevoTotalValorPlan = this._modalService.usuario.plan.valor - ((nuevoPorcentajeDescuento/100) * this._modalService.usuario.plan.valor);
      }
    }else{
      nuevoPorcentajeDescuento = 0;
      nuevoTotalValorPlan = this._modalService.usuario.plan.valor;
    }

    console.log(nuevoTelefono);

    let usuario = new Usuario(nuevoNombre,
                              nuevoEmail,
                              null,
                              nuevoPlan,
                              nuevaCedula,
                              nuevaFechaNaciemiento,
                              nuevoTelefono,
                              nuevaDireccion,
                              nuevoRH,
                              nuevoNombreContacto,
                              nuevoTelefonoContacto,
                              nuevoDescuento,
                              nuevoPorcentajeDescuento,
                              nuevoTotalValorPlan);
    
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

  actualizarDescuento(evento: any){
    console.log(evento);
    this._modalService.usuario.descuento = evento;
  }

}
