import { Component, OnInit } from '@angular/core';
import { HoraService } from '../../services/hora/hora.service';
import { Hora } from 'src/app/models/hora.model';
import { Clase } from 'src/app/models/clase.model';
import { ClaseService } from '../../services/clase/clase.service';
import { ReservaService } from '../../services/reserva/reserva.service';
import swal from 'sweetalert';
import { Reserva } from 'src/app/models/reserva.model';
import { Usuario } from 'src/app/models/usuario.model';
import { ModalClaseUsuarioService } from '../../components/modals/modalClaseUsuario/modalClaseUsuario.service';
import { UsuarioService } from 'src/app/services/service.index';


@Component({
  selector: 'app-reservas-usuario',
  templateUrl: './reservasUsuario.component.html',
  styles: []
})
export class ReservasUsuarioComponent implements OnInit {

  DIAS = [
    {id: 1, name: 'Lunes', fecha: ''},
    {id: 2, name: 'Martes', fecha: ''},
    {id: 3, name: 'Miercoles', fecha: ''},
    {id: 4, name: 'Jueves', fecha: ''},
    {id: 5, name: 'Viernes', fecha: ''},
    {id: 6, name: 'Sabado', fecha: ''}
];

  fechaInicial: number;
  fechaFinal: number;

  horas: Hora[] = [];
  clases: Clase[] = [];
  reservas: Reserva[] = [];

  mostrar: string = 'oculto';

  constructor(public _horaService: HoraService,
              public _claseService: ClaseService,
              public _reservasService: ReservaService,
              public _modalService: ModalClaseUsuarioService,
              public _usuarioService: UsuarioService){
              } 

  ngOnInit(): void {

    this._usuarioService.paginaActual = 'Reserva y Clases';
    this.calcularFechas();
    this.cargarHoras();
    this.cargarClases();
    this.cargarReservas(localStorage.getItem('id'));
  }

  calcularFechas(){

    let lunes = new Date();
    let martes = new Date();
    let miercoles = new Date();
    let jueves = new Date();
    let viernes = new Date();
    let sabado = new Date();

    if(new Date().getDay() === 1){
      console.log('LUNES');

      let fechaTempFin = new Date();
      this.fechaInicial = new Date().getDate();
      fechaTempFin.setDate(new Date().getDate() + 5);
      this.fechaFinal = fechaTempFin.getDate();

      //CarcgarFechasADias
      console.log('FECHA ACTUAL: ', new Date().getDate() + '/' + new Date().getMonth()+1 + '/' +  new Date().getFullYear());

      martes.setDate(new Date().getDate() + 1);
      miercoles.setDate(new Date().getDate() + 2);
      jueves.setDate(new Date().getDate() + 3);
      viernes.setDate(new Date().getDate() + 4);
      sabado.setDate(new Date().getDate() + 5);

      let fechas = [
        {dia: lunes.getDate(), mes: lunes.getMonth() + 1, anio: lunes.getFullYear()},
        {dia: martes.getDate(), mes: martes.getMonth() + 1, anio: martes.getFullYear()},
        {dia: miercoles.getDate(), mes: miercoles.getMonth() + 1, anio: miercoles.getFullYear()},
        {dia: jueves.getDate(), mes: jueves.getMonth() + 1, anio: jueves.getFullYear()},
        {dia: viernes.getDate(), mes: viernes.getMonth() + 1, anio: viernes.getFullYear()},
        {dia: sabado.getDate(), mes: sabado.getMonth() + 1, anio: sabado.getFullYear()}
      ];
      this.cargarFechaEnDia(fechas);
    }
    if(new Date().getDay() === 2){
      console.log('MARTES');

      let fechaTempIni = new Date();
      let fechaTempFin = new Date();

      fechaTempIni.setDate(new Date().getDate() - 1);
      this.fechaInicial = fechaTempIni.getDate();
      fechaTempFin.setDate(new Date().getDate() + 4);
      this.fechaFinal = fechaTempFin.getDate();

      //CarcgarFechasADias
      console.log('FECHA ACTUAL: ', new Date().getDate() + '/' + new Date().getMonth() + '/' +  new Date().getFullYear());

      lunes.setDate(new Date().getDate() - 1);
      miercoles.setDate(new Date().getDate() + 1);
      jueves.setDate(new Date().getDate() + 2);
      viernes.setDate(new Date().getDate() + 3);
      sabado.setDate(new Date().getDate() + 4);

      let fechas = [
        {dia: lunes.getDate(), mes: lunes.getMonth() + 1, anio: lunes.getFullYear()},
        {dia: martes.getDate(), mes: martes.getMonth() + 1, anio: martes.getFullYear()},
        {dia: miercoles.getDate(), mes: miercoles.getMonth() + 1, anio: miercoles.getFullYear()},
        {dia: jueves.getDate(), mes: jueves.getMonth() + 1, anio: jueves.getFullYear()},
        {dia: viernes.getDate(), mes: viernes.getMonth() + 1, anio: viernes.getFullYear()},
        {dia: sabado.getDate(), mes: sabado.getMonth() + 1, anio: sabado.getFullYear()}
      ];
      this.cargarFechaEnDia(fechas);
    }
    if(new Date().getDay() === 3){
      console.log('MIERCOLES');

      let fechaTempIni = new Date();
      let fechaTempFin = new Date();

      fechaTempIni.setDate(fechaTempIni.getDate() - 2);
      this.fechaInicial = fechaTempIni.getDate();
      fechaTempFin.setDate(fechaTempIni.getDate() + 5);
      this.fechaFinal = fechaTempFin.getDate();

      //CarcgarFechasADias
      console.log('FECHA ACTUAL: ', new Date().getDate() + '/' + new Date().getMonth() + '/' +  new Date().getFullYear());

      lunes.setDate(new Date().getDate() - 2);
      martes.setDate(new Date().getDate() - 1);
      jueves.setDate(new Date().getDate() + 1);
      viernes.setDate(new Date().getDate() + 2);
      sabado.setDate(new Date().getDate() + 3);
      
      let fechas = [
        {dia: lunes.getDate(), mes: lunes.getMonth() + 1, anio: lunes.getFullYear()},
        {dia: martes.getDate(), mes: martes.getMonth() + 1, anio: martes.getFullYear()},
        {dia: miercoles.getDate(), mes: miercoles.getMonth() + 1, anio: miercoles.getFullYear()},
        {dia: jueves.getDate(), mes: jueves.getMonth() + 1, anio: jueves.getFullYear()},
        {dia: viernes.getDate(), mes: viernes.getMonth() + 1, anio: viernes.getFullYear()},
        {dia: sabado.getDate(), mes: sabado.getMonth() + 1, anio: sabado.getFullYear()}
      ];
      this.cargarFechaEnDia(fechas);

    }
    if(new Date().getDay() === 4){
      console.log('JUEVES');

      let fechaTempIni = new Date();
      let fechaTempFin = new Date();

      fechaTempIni.setDate(new Date().getDate() - 3);
      this.fechaInicial = fechaTempIni.getDate();
      fechaTempFin.setDate(new Date().getDate() + 2);
      this.fechaFinal = fechaTempFin.getDate();

      //CarcgarFechasADias
      console.log('FECHA ACTUAL: ', new Date().getDate() + '/' + new Date().getMonth() + '/' +  new Date().getFullYear());

      lunes.setDate(new Date().getDate() - 3);
      martes.setDate(new Date().getDate() - 2);
      miercoles.setDate(new Date().getDate() - 1);
      viernes.setDate(new Date().getDate() + 1);
      sabado.setDate(new Date().getDate() + 2);
      
      let fechas = [
        {dia: lunes.getDate(), mes: lunes.getMonth() + 1, anio: lunes.getFullYear()},
        {dia: martes.getDate(), mes: martes.getMonth() + 1, anio: martes.getFullYear()},
        {dia: miercoles.getDate(), mes: miercoles.getMonth() + 1, anio: miercoles.getFullYear()},
        {dia: jueves.getDate(), mes: jueves.getMonth() + 1, anio: jueves.getFullYear()},
        {dia: viernes.getDate(), mes: viernes.getMonth() + 1, anio: viernes.getFullYear()},
        {dia: sabado.getDate(), mes: sabado.getMonth() + 1, anio: sabado.getFullYear()}
      ];
      this.cargarFechaEnDia(fechas);
    }
    if(new Date().getDay() === 5){
      console.log('VIERNES');
      
      let fechaTempIni = new Date();
      let fechaTempFin = new Date();
      
      fechaTempIni.setDate(new Date().getDate() - 4);
      this.fechaInicial = fechaTempIni.getDate();
      fechaTempFin.setDate(new Date().getDate() + 1);
      this.fechaFinal = fechaTempFin.getDate();

      //CarcgarFechasADias
      console.log('FECHA ACTUAL: ', new Date().getDate() + '/' + new Date().getMonth() + '/' +  new Date().getFullYear());

      lunes.setDate(new Date().getDate() - 4);
      martes.setDate(new Date().getDate() - 3);
      miercoles.setDate(new Date().getDate() - 2);
      jueves.setDate(new Date().getDate() - 1);
      sabado.setDate(new Date().getDate() + 1);
      
      let fechas = [
        {dia: lunes.getDate(), mes: lunes.getMonth() + 1, anio: lunes.getFullYear()},
        {dia: martes.getDate(), mes: martes.getMonth() + 1, anio: martes.getFullYear()},
        {dia: miercoles.getDate(), mes: miercoles.getMonth() + 1, anio: miercoles.getFullYear()},
        {dia: jueves.getDate(), mes: jueves.getMonth() + 1, anio: jueves.getFullYear()},
        {dia: viernes.getDate(), mes: viernes.getMonth() + 1, anio: viernes.getFullYear()},
        {dia: sabado.getDate(), mes: sabado.getMonth() + 1, anio: sabado.getFullYear()}
      ];
      this.cargarFechaEnDia(fechas);
    }
    if(new Date().getDay() === 6){
      console.log('SABADO');

      let fechaTempIni = new Date();
      let fechaTempFin = new Date();

      fechaTempIni.setDate(new Date().getDate() - 5);
      this.fechaInicial = fechaTempIni.getDate();
      this.fechaFinal = fechaTempFin.getDate();

      //CarcgarFechasADias
      console.log('FECHA ACTUAL: ', new Date().getDate() + '/' + new Date().getMonth() + '/' +  new Date().getFullYear());

      lunes.setDate(new Date().getDate() - 5);
      martes.setDate(new Date().getDate() - 4);
      miercoles.setDate(new Date().getDate() - 3);
      jueves.setDate(new Date().getDate() - 2);
      viernes.setDate(new Date().getDate() - 1);

      let fechas = [
        {dia: lunes.getDate(), mes: lunes.getMonth() + 1, anio: lunes.getFullYear()},
        {dia: martes.getDate(), mes: martes.getMonth() + 1, anio: martes.getFullYear()},
        {dia: miercoles.getDate(), mes: miercoles.getMonth() + 1, anio: miercoles.getFullYear()},
        {dia: jueves.getDate(), mes: jueves.getMonth() + 1, anio: jueves.getFullYear()},
        {dia: viernes.getDate(), mes: viernes.getMonth() + 1, anio: viernes.getFullYear()},
        {dia: sabado.getDate(), mes: sabado.getMonth() + 1, anio: sabado.getFullYear()}
      ];
      this.cargarFechaEnDia(fechas);
    }
    if(new Date().getDay() === 0){
      console.log('DOMINGO');
      
      let fechaTempIni = new Date();
      let fechaTempFin = new Date();
      
      fechaTempIni.setDate(new Date().getDate() + 1);
      this.fechaInicial = fechaTempIni.getDate();
      fechaTempFin.setDate(new Date().getDate() + 6);
      this.fechaFinal = fechaTempFin.getDate();

      //CarcgarFechasADias
      console.log('FECHA ACTUAL: ', new Date().getDate() + '/' + new Date().getMonth() + '/' +  new Date().getFullYear());

      lunes.setDate(new Date().getDate() + 1);
      martes.setDate(new Date().getDate() + 2);
      miercoles.setDate(new Date().getDate() + 3);
      jueves.setDate(new Date().getDate() + 4);
      viernes.setDate(new Date().getDate() + 5);
      sabado.setDate(new Date().getDate() + 6);
      
      let fechas = [
        {dia: lunes.getDate(), mes: lunes.getMonth() + 1, anio: lunes.getFullYear()},
        {dia: martes.getDate(), mes: martes.getMonth() + 1, anio: martes.getFullYear()},
        {dia: miercoles.getDate(), mes: miercoles.getMonth() + 1, anio: miercoles.getFullYear()},
        {dia: jueves.getDate(), mes: jueves.getMonth() + 1, anio: jueves.getFullYear()},
        {dia: viernes.getDate(), mes: viernes.getMonth() + 1, anio: viernes.getFullYear()},
        {dia: sabado.getDate(), mes: sabado.getMonth() + 1, anio: sabado.getFullYear()}
      ];
      this.cargarFechaEnDia(fechas);
    }
  }

  cargarHoras(){
    this._horaService.cargarHoras()
                          .subscribe((resp: any) =>{
                            this.horas = resp.horas;
                          });
  }
 
  validarHoras(hora: Hora, dia: string){
    if (dia === 'sabado') {
      if (hora.horaInicio === '8:30'){
        return true;
      } else if (hora.horaInicio === '9:30') {
        return true;
      } else if (hora.horaInicio === '10:30') {
        return true;
      } else {
        return false;
      }
    } else {
      if (hora.horaInicio === '8:30') {
        return false;
      } else if (hora.horaInicio === '9:30') {
        return false;
      } else if (hora.horaInicio === '10:30') {
        return false;
      } else {
        return true;
      }
    }
  }

  cargarClases() {
    this._claseService.cargarClases(this.DIAS[0].fecha, this.DIAS[5].fecha)
                          .subscribe((resp: any) =>{
                            this.clases = resp.clases;
                          });
  }

  cargarFechaEnDia(fechas: any[]){
    for (let i = 0; i < this.DIAS.length; i++) {

      //console.log(fechas[i]);
      if(fechas[i].mes <= 9){
        if(fechas[i].dia <= 9){
          this.DIAS[i].fecha = fechas[i].anio + '-' + 0+fechas[i].mes + '-' + 0+fechas[i].dia;
        }else{
          this.DIAS[i].fecha = fechas[i].anio + '-' + 0+fechas[i].mes + '-' + fechas[i].dia;
        }
      }else{
        if(fechas[i].dia <= 9){
          this.DIAS[i].fecha = fechas[i].anio + '-' + fechas[i].mes + '-' + 0+fechas[i].dia;
        }else{
          this.DIAS[i].fecha = fechas[i].anio + '-' + fechas[i].mes + '-' + fechas[i].dia;
        }
      }
    }
  }

  buscarFecha(dia: number){
    for (let i = 0; i < this.DIAS.length; i++) {
      if(this.DIAS[i].id === dia){
        return this.DIAS[i].fecha;
      }
    }
  }

  existeClase(hora: Hora, dia: any){
    let mostrar = 'oculto';
    for (const clase of this.clases) {
      if (clase.fecha.substring(0, 10) === dia.fecha
        && clase.horaInicio === hora.horaInicio
        && clase.horaFinal === hora.horaFin)
      {
        mostrar = '';
      }
    }
    return mostrar;
  }

  buscarClase(hora: Hora, dia: any){

    for (const clase of this.clases) {
      if(clase.fecha.substring(0, 10) === dia.fecha
        && clase.horaInicio === hora.horaInicio
        && clase.horaFinal === hora.horaFin)
      {
        return clase;
      }
    }
    return new Clase(null, null, null, null, null, null, null);
  }

  eliminarClase(clase: Clase){

    this._claseService.borrarClase(clase).subscribe( resp => {
      this.cargarClases();
    });
    
  }

  cargarReservas(idUsuario: string){
    this._reservasService.consultarReservasPorUsuario(idUsuario).subscribe( resp => {
      this.reservas = resp.reservas;
    });
  }

  validarCupo(hora: Hora, dia: any){

    let flag: Boolean;
    const clase = this.buscarClase(hora, dia);
    if(clase.cupo <= 0){
      flag = true;
    } else {
      //console.log(this.reservas);
      if(this.reservas.length > 0){
        for (const reserva of this.reservas) {
         if(clase._id === reserva.clase._id){
            flag = true;
            break;
         }else{
            flag = false;
            //break;
          }
        }
      }
    }

    return flag;
  }

  reservar(hora: Hora, dia: any){

    const clase = this.buscarClase(hora, dia);
    const usuario = new Usuario(null, null, null, null, null, null, null, null, null, null, null,
                              null, null, null, null, null, null, null, null, null,
                              localStorage.getItem('id'));

    const reserva = new Reserva(usuario, clase, clase.fecha);
    clase.cupo = clase.cupo - 1;

    this._reservasService.crearReserva(reserva).subscribe( resp => {
      console.log(resp);
      if(resp.ok){
        this._claseService.actualizarClase(clase).subscribe(resp =>{
          if(resp){
            this.calcularFechas();
            this.cargarHoras();
            this.cargarClases();
            this.cargarReservas(localStorage.getItem('id'));
          }
        });
      }else{
        swal('No se pudo realizar la reserva', 'Por favor contactese con el administrador', 'error');
      }
    });
  }

  cancelarReserva(hora: Hora, dia: any){

    const clase = this.buscarClase(hora, dia);
    let uno: number = 1;
    let cupo: number = Number.parseInt(clase.cupo.toString());;
    clase.cupo = cupo + uno;
    for (const reserva of this.reservas) {
      if(clase._id === reserva.clase._id){
        this._reservasService.borrarReserva(reserva).subscribe( resp => {
          if(resp.ok){
            this._claseService.actualizarClase(clase).subscribe(resp =>{
              if(resp){
                this.calcularFechas();
                this.cargarHoras();
                this.cargarClases();
                this.cargarReservas(localStorage.getItem('id'));
              }
            });
          }else{
            swal('No se pudo cancelar la reserva', 'Por favor contactese con el administrador', 'error');
          }
        });
      }
    }
  }

}
