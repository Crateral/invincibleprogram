import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from 'src/app/models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      plan: new FormControl(null, Validators.required)
    });

  }

  crearUsuario(){

    if(this.forma.invalid){
        return;
    }

    let usuario = new Usuario(this.forma.value.nombre,
                               this.forma.value.email, 
                               this.forma.value.password,
                               new Date().getDate().toString(),
                               this.forma.value.plan);

    this._usuarioService.crearUsuario(usuario)
                        .subscribe( resp => {
                          console.log(resp);
                          this.forma.reset();
                        });

    console.log(this.forma.value);
  }

}
