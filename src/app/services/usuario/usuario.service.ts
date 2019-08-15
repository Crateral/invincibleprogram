import { Injectable, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';

import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService{

    token: string;
    usuario: Usuario;
    menu: any;
    role: string;
    paginaActual: string;

  constructor(public http: HttpClient,
              public ruter:Router,
              public _subirArchivoService: SubirArchivoService){
      this.cargarStorage();
   }

   estaLogueado(){
      return (this.token.length > 5) ? true : false;
    }

    guardarStorage( id: string, token: string, usuario: Usuario, menu: any){
      localStorage.setItem('id', id);
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      localStorage.setItem('role', usuario.role);
      localStorage.setItem('menu', JSON.stringify(menu));

      this.usuario = usuario;
      this.token = token;
      this.menu = menu;
      this.role = usuario.role;
    }

    cargarStorage(){
      if(localStorage.getItem('token')){
        this.token = localStorage.getItem('token');
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
        this.menu = JSON.parse(localStorage.getItem('menu'));
        this.role = localStorage.getItem('role');
      }else{
        this.token = '';
        this.usuario = null;
        this.menu = [];
        this.role = '';
      }
    }

  logout(){
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('usuario');
    localStorage.removeItem('role');
    localStorage.removeItem('menu');
    this.ruter.navigate(['/login']);
  }

  login( usuario: Usuario, recordar: boolean = false ){

    if(recordar){
      localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario)
                      .map((resp: any) => {
                        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
                        return true;
                      });
  }

  crearUsuario(usuario: Usuario){
    let url = URL_SERVICIOS + '/usuario';
  
    return this.http.post(url, usuario)
                    .map((resp: any) =>{
                      swal('Usuario creado correctamente', '', 'success');
                      return resp.usuario;
                      });

  }

  actualizarUsuario(usuario: Usuario){

    let url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;

    return this.http.put(url, usuario).map((resp: any) =>{
      if(usuario._id === this.usuario._id){
        this.guardarStorage(resp.usuario._id, this.token, resp.usuario, this.menu);
      }
      swal('Usuario actulizado', '', 'success');
      return true;
    });

  }

  cambiarImagen( imagen: File, id: string){

    this._subirArchivoService.subirArchivo(imagen,id)
                              .then((resp: any) =>{
                                this.usuario.img = resp.usuario.img;
                                swal('Imagen actualizada', '', 'success');
                                this.guardarStorage(id,this.token,this.usuario, this.menu);
                              })
                              .catch(resp =>{
                                console.log(resp);
                              });
  }

  cargarUsuarios(desde: number = 0){
    let url = URL_SERVICIOS + '/usuario/?desde=' + desde;

    return this.http.get(url);
  }

  buscarUsuarios(termino: string){
    let url = URL_SERVICIOS + '/busqueda/usuario/' + termino;

    return this.http.get(url);
  }

}
