import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { Plan } from '../../models/plan.model';
import { PlanService } from '../../services/plan/plan.service';
import swal from 'sweetalert';
import { ModalService } from '../../components/modal/modal.service';

declare function init_plugins();

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styles: []
})
export class PlanesComponent implements OnInit {

  formaC: FormGroup;
  formaA: FormGroup;
  planes: Plan[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _planService: PlanService,
              public _modalService: ModalService) { }

  ngOnInit() {
    init_plugins();

    this.formaC = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      valor: new FormControl(null, Validators.required)
    });

    this.formaA = new FormGroup({
      nombreA: new FormControl(null, Validators.required),
      valor: new FormControl(null, Validators.required)
    });

    this.cargarPlanes();
  }

  crearPlan(){
    if(this.formaC.invalid){
      return;
    }
    let plan = new Plan(this.formaC.value.nombre,
    this.formaC.value.valor);

    this._planService.crearPlan(plan)
                        .subscribe( resp => {
                          this.formaC.reset();
                          this.cargarPlanes();
                        });
  }

  cargarPlanes(){
  
    this.cargando = true;

    this._planService.cargarPlanes(this.desde)
                          .subscribe((resp: any) =>{
                            this.totalRegistros = resp.total;
                            this.planes = resp.planes;
                            this.cargando = false;
                          });
  }

  cambiarDesde(valor: number){
    let nuevoDesde = this.desde + valor;

    if(nuevoDesde >= this.totalRegistros){
      return;
    }
    if(nuevoDesde < 0){
      return;
    }
    this.desde = this.desde + valor;

    this.cargarPlanes();
  }

  eliminarPlan(plan: Plan){

  }

  buscarPlan(termino: string){

    if(termino.length <= 0){
      this.cargarPlanes();
      return;
    }

    this.cargando = true;

    this._planService.buscarPlanes(termino)
                          .subscribe((resp: any) =>{
                            this.planes = resp.planes;
                            this.cargando = false;
                          });
  }

}
