import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(public http: HttpClient) { }

  cargarReservasPorFecha(fecha: string) {

    let url = URL_SERVICIOS + '/busqueda/reserva/' + fecha;
    console.log(url)
     return this.http.get(url);
 }

}
