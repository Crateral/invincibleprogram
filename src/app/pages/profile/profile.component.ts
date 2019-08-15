import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import swal from 'sweetalert';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: any;
  formaC: FormGroup;

  constructor( public _usuarioService: UsuarioService) { 
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
    this._usuarioService.paginaActual = 'Perfil';
    this.formaC = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, null),
      planC: new FormControl(null, Validators.required),
      cedula: new FormControl(null, Validators.required),
      fechaNacimiento: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required),
      direccion:  new FormControl(null, Validators.required),
      rh: new FormControl(null,Validators.required),
      nombreContacto: new FormControl(null, Validators.required),
      telefonoContacto: new FormControl(null, Validators.required)
    });
  }

  guardarPerfil(usuario: Usuario){

    if(this.formaC.value.nombre){
      usuario.nombre = this.formaC.value.nombre;
    }else{
      usuario.nombre = this.usuario.nombre;
    }

    if(this.formaC.value.email){
      usuario.email = this.formaC.value.email;
    }else{
      usuario.email = this.usuario.email;
    }

    if(this.formaC.value.cedula){
      usuario.cedula = this.formaC.value.cedula;
    }else{
      usuario.cedula = this.usuario.cedula;
    }

    if(this.formaC.value.fechaNacimiento){
      usuario.fechaNacimiento = this.formaC.value.fechaNacimiento;
    }else{
      usuario.fechaNacimiento = this.usuario.fechaNacimiento;
    }

    if(this.formaC.value.telefono){
      usuario.telefono = this.formaC.value.telefono;
    }else{
      usuario.telefono = this.usuario.telefono;
    }

    if(this.formaC.value.direccion){
      usuario.direccion = this.formaC.value.direccion;
    }else{
      usuario.direccion = this.usuario.direccion;
    }

    if(this.formaC.value.rh){
      usuario.rh = this.formaC.value.rh;
    }else{
      usuario.rh = this.usuario.rh;
    }

    if(this.formaC.value.nombreContacto){
      usuario.nombreContacto = this.formaC.value.nombreContacto;
    }else{
      usuario.nombreContacto = this.usuario.nombreContacto;
    }

    if(this.formaC.value.telefonoContacto){
      usuario.telefonoContacto = this.formaC.value.telefonoContacto;
    }else{
      usuario.telefonoContacto = this.usuario.telefonoContacto;
    }

    this._usuarioService.actualizarUsuario(this.usuario)
                        .subscribe(resp =>{
                            console.log(resp);
                          });

  }

}
