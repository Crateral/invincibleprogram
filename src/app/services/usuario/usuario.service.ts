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

  constructor(public http: HttpClient,
              public ruter:Router,
              public _subirArchivoService: SubirArchivoService){
      this.cargarStorage();
   }

   estaLogueado(){
      return (this.token.length > 5) ? true : false;
    }

    guardarStorage( id: string, token: string, usuario: Usuario){
      localStorage.setItem('id', id);
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      this.usuario = usuario;
      this.token = token;
    }

    cargarStorage(){
      if(localStorage.getItem('token')){
        this.token = localStorage.getItem('token');
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
      }else{
        this.token = '';
        this.usuario = null;
      }
    }

  logout(){
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('usuario');
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
                        
                        this.guardarStorage(resp.id, resp.token, resp.usuario);

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
        this.guardarStorage(resp.usuario._id, this.token, resp.usuario);
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
                                this.guardarStorage(id,this.token,this.usuario);
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
    
    console.log("URL: " + url);

    return this.http.get(url);
  }

}
