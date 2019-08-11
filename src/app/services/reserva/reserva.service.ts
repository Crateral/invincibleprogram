import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import swal from 'sweetalert';
import { Reserva } from 'src/app/models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  token: string;

  constructor(public http: HttpClient) {
    this.cargarStorage();
   }

  cargarReservasPorFecha(fecha: string) {

    let url = URL_SERVICIOS + '/busqueda/reserva/' + fecha;
    console.log(url);
     return this.http.get(url);
 }

   crearReserva(reserva: Reserva){

    this.cargarStorage();

    let url = URL_SERVICIOS + '/reserva' + '?token=' + this.token;

    return this.http.post(url, reserva)
                    .map((resp: any) =>{
                      swal('Reserva creada correctamente', '', 'success');
                        return resp;
                      });

   }

   borrarReserva(reserva: Reserva){

    this.cargarStorage();
    
    let url = URL_SERVICIOS + '/reserva/' + reserva._id + '?token=' + this.token;

    return this.http.delete(url).map((resp: any) =>{
      swal('Reserva cancelada', '', 'success');
      return resp;
    });

  }

   cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
    }else{
      this.token = '';
    }
  }

  consultarReservaPorIds(idClase: string, idUsuario: string){
    let url = URL_SERVICIOS + '/busqueda/reserva/ids/' + idClase + '/' + idUsuario;

    return this.http.get(url)
                    .map((resp: any) =>{
                        return resp.reserva;
                      });
  }

  consultarReservasPorUsuario(idUsuario: string){
    let url = URL_SERVICIOS + '/busqueda/reserva/usuario/' + idUsuario;

    console.log(url);

    return this.http.get(url)
                    .map((resp: any) =>{
                        return resp;
                      });
  }

}
