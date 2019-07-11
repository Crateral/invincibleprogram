import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { Plan } from '../../models/plan.model';
import { PlanService } from '../../services/plan/plan.service';
import swal from 'sweetalert';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
  //styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formaC: FormGroup;
  formaA: FormGroup;
  usuarios: Usuario[] = [];
  planes: Plan[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _usuarioService: UsuarioService,
    public _planService: PlanService
  ) { }

  ngOnInit() {
    init_plugins();

    this.formaC = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      planC: new FormControl(null, Validators.required)
    });

    this.formaA = new FormGroup({
      plan: new FormControl(null, Validators.required)
    });

    this.cargarPlanes();
    this.cargarUsuarios();
    
  }

  crearUsuario(){

    if(this.formaC.invalid){
        return;
    }

    let usuario = new Usuario(this.formaC.value.nombre,
                               this.formaC.value.email, 
                               this.formaC.value.password,
                               new Date().getDate().toString(),
                               this.formaC.value.planC);

    this._usuarioService.crearUsuario(usuario)
                        .subscribe( resp => {
                          this.formaC.reset();
                          this.cargarUsuarios();
                        });

    console.log(this.formaC.value);
  }

  cargarUsuarios(){
  
    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde)
                          .subscribe((resp: any) =>{
                            this.totalRegistros = resp.total;
                            this.usuarios = resp.usuarios;
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

    this.cargarUsuarios();
  }

  cargarPlanes() {
    this._planService.cargarPlanes(0)
                      .subscribe((resp: any) =>{
                        this.planes = resp.planes;
                        console.log(resp);
                      });
  }

  buscarUsuario(termino: string){

    if(termino.length <= 0){
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios(termino)
                          .subscribe((resp: any) =>{
                            this.usuarios = resp.usuarios;
                            this.cargando = false;
                          });
  }

  cambiarEstadoUsuario(usuario: Usuario, btn: string){

    if(btn === 'Activar'){
      if(usuario._id === this._usuarioService.usuario._id){
        swal('No puede Activar este usuario', 'No se puede activar a su mismo usuario.', 'error');
        return;
      } else {
        if (usuario.estado === 'INACTIVO'){
          usuario.estado = 'ACTIVO';
      
          this._usuarioService.actualizarUsuario(usuario)
                            .subscribe((resp: any) => {
                              this.cargarUsuarios();
                            });
        } else {
          swal('No puede Activar este usuario', 'Este usuario ya se encuentra activo.', 'warning');
          return;
        }
      }
    } else {
      if(usuario._id === this._usuarioService.usuario._id){
        swal('No puede Inactivar este usuario', 'No se puede inactivar a su mismo usuario.', 'error');
        return;
      } else {
        
        if (usuario.estado === 'ACTIVO'){
          usuario.estado = 'INACTIVO';
      
          this._usuarioService.actualizarUsuario(usuario)
                            .subscribe((resp: any) => {
                              this.cargarUsuarios();
                            });
        } else {
          swal('No puede Inactivar este usuario', 'Este usuario ya se encuentra inactivo.', 'warning');
          return;
        }
      }
    }

  }

  actualizarPlan(usuario: Usuario){

    usuario.plan = this.formaA.value.plan;

    this._usuarioService.actualizarUsuario(usuario)
                            .subscribe((resp: any) => {
                              this.cargarUsuarios();
                            });

    console.log(usuario);
  }

}
