import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';

import swal from 'sweetalert';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    token: string;
    usuario: Usuario;

  constructor(public http: HttpClient,
              public ruter:Router){
      this.cargarStorage();
   }

   estaLogueado(){
      return (this.token.length > 5) ? true : false;
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
                        localStorage.setItem('id', resp.id);
                        localStorage.setItem('token', resp.token);
                        localStorage.setItem('usuario', JSON.stringify(resp.usuario));
                        this.token = resp.token;
                        this.usuario = usuario;
                        return true;
                      });

  }

  crearUsuario(usuario: Usuario){
    let url = URL_SERVICIOS + '/usuario';
  
    return this.http.post(url, usuario)
                    .map((resp: any) =>{
                      swal('Usuario creado correctamente');
                      return resp.usuario;
                      });

  }
}
