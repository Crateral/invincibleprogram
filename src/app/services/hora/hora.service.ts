import { Injectable, OnInit } from '@angular/core';
import { Hora } from '../../models/hora.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';

import swal from 'sweetalert';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HoraService {

  constructor(public http: HttpClient,
              public ruter: Router) { }

  cargarHoras() {

     let url = URL_SERVICIOS + '/hora/';
            
      return this.http.get(url);
  }
}
