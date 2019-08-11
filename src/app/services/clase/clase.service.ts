import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import swal from 'sweetalert';
import { Clase } from '../../models/clase.model';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  token: string;

  constructor(public http: HttpClient) {
    this.cargarStorage();
  }

  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
    }else{
      this.token = '';
    }
  }

  cargarClases(fechaIni: string, fechaFin: string) {
      let url = URL_SERVICIOS + '/busqueda/clase/' + fechaIni + '/' + fechaFin;
      return this.http.get(url);
   }

   cargarClasePorFecha(fechaIni: string, hora: string){
    let url = URL_SERVICIOS + '/busqueda/clase/dia/' + new Date(fechaIni).toISOString() + '/' + hora;
    return this.http.get(url);
   }

 crearClase(clase: Clase){
    this.cargarStorage();

    let url = URL_SERVICIOS + '/clase' + '?token=' + this.token;

    return this.http.post(url, clase)
                    .map((resp: any) =>{
                      swal('Clase creada correctamente', '', 'success');
                      return resp.clase;
                    });

  }

  actualizarClase(clase: Clase){

    this.cargarStorage();

    let url = URL_SERVICIOS + '/clase/' + clase._id + '?token=' + this.token;

    return this.http.put(url, clase).map((resp: any) =>{
      return resp;
    });

  }

  borrarClase(clase: Clase){

    this.cargarStorage();
  
    let url = URL_SERVICIOS + '/clase/' + clase._id + '?token=' + this.token;

    return this.http.delete(url).map((resp: any) =>{
      swal('Clase eliminada', '', 'success');
      return true;
    });

  }


}
