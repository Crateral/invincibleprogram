import { Injectable, OnInit } from '@angular/core';
import { Plan } from '../../models/plan.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';

import swal from 'sweetalert';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  token: string;

  constructor(public http: HttpClient,
              public ruter: Router) {
                this.cargarStorage();
               }


  cargarPlanes(desde: number = 0) {

    let url = URL_SERVICIOS + '/plan/?desde=' + desde;

    return this.http.get(url);
  }

  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
    }else{
      this.token = '';
    }
  }

  crearPlan(plan: Plan){
    let url = URL_SERVICIOS + '/plan' + '?token=' + this.token;;
  
    return this.http.post(url, plan)
                    .map((resp: any) =>{
                      swal('Plan creado correctamente', '', 'success');
                        return resp.plan;
                      });

  }

  buscarPlanes(termino: string){
    let url = URL_SERVICIOS + '/busqueda/plan/' + termino;
    
    console.log("URL: " + url);

    return this.http.get(url);
  }

}
