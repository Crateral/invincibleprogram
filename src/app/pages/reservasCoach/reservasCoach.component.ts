import { Component, OnInit } from '@angular/core';
import { Clase } from 'src/app/models/clase.model';
import { Reserva } from 'src/app/models/reserva.model';
import { Hora } from 'src/app/models/hora.model';
import { ClaseService } from 'src/app/services/clase/clase.service';
import { HoraService } from 'src/app/services/hora/hora.service';
import { ReservaService } from 'src/app/services/reserva/reserva.service';
import { ModalReservaAdmService } from 'src/app/components/modals/modalReservaAdm/modalReservaAdm.service';
import { UsuarioService } from 'src/app/services/service.index';

declare function init_plugins();

@Component({
  selector: 'app-reservas-coach',
  templateUrl: './reservasCoach.component.html',
  styles: []
})
export class ReservasCoachComponent implements OnInit {

  DIAS = [
    {id: 1, name: 'Lunes', fecha: ''},
    {id: 2, name: 'Martes', fecha: ''},
    {id: 3, name: 'Miercoles', fecha: ''},
    {id: 4, name: 'Jueves', fecha: ''},
    {id: 5, name: 'Viernes', fecha: ''},
    {id: 6, name: 'Sabado', fecha: ''}
];

id: number = 1;

fecha = new Date();

clase: Clase;

clases: Clase[];

diaActual: number;

reservas: Reserva[] = new Array();

    reservas6: Reserva[] = new Array();
    reservas7: Reserva[] = new Array();
    reservas8: Reserva[] = new Array();
    reservas9: Reserva[] = new Array();
    reservas10: Reserva[] = new Array();
    reservas16: Reserva[] = new Array();
    reservas17: Reserva[] = new Array();
    reservas18: Reserva[] = new Array();
    reservas19: Reserva[] = new Array();
    reservas20: Reserva[] = new Array();
    reservas830: Reserva[] = new Array();
    reservas930: Reserva[] = new Array();
    reservas1030: Reserva[] = new Array();

fechaInicial: number;
fechaFinal: number;

horas: Hora[] = [];

  constructor(public _reservaService: ReservaService,
              public _horaService: HoraService,
              public _claseService: ClaseService,
              public _modalService: ModalReservaAdmService,
              public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this._usuarioService.paginaActual = 'Reservas';
    let fechaTmp =this.obtenerFechaActual();
    this.calcularFechas();
    this.cargarHoras();
    this.cargarClases();
    for (const dia of this.DIAS) {
      if(dia.fecha === fechaTmp){
        console.log(dia.id);
        this.obtenerReservasPorFecha(dia.id, fechaTmp);
        this.diaActual = dia.id;
        break;
      }
    }
  }

  obtenerReservasPorFecha(id: number, fecha: string){
    this._reservaService.cargarReservasPorFecha(fecha)
                        .subscribe((resp: any) =>{
                            this.reservas = resp.reservas;
                            this.agruparReservasPorHora(this.reservas);
                          });
  }

  monstrarTab(id){
    if(this.id === id){
      return true;
    }
    return false;
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
      console.log('FECHA ACTUAL: ', new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' +  new Date().getFullYear());

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

  cargarFechaEnDia(fechas: any[]){
    for (let i = 0; i < this.DIAS.length; i++) {
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

  agruparReservasPorHora(reservas: Reserva[], horaInicio?: string){

    let numeroReserva: number = 0;

    this.reservas6 = new Array();
    this.reservas7 = new Array();
    this.reservas8 = new Array();
    this.reservas9 = new Array();
    this.reservas10 = new Array();
    this.reservas16 = new Array();
    this.reservas17 = new Array();
    this.reservas18 = new Array();
    this.reservas19 = new Array();
    this.reservas20 = new Array();
    this.reservas830 =  new Array();
    this.reservas930 =  new Array();
    this.reservas1030 =  new Array();

    //console.log(reservas);

    for (const reserva of reservas) {
      if (reserva.clase.horaInicio === horaInicio) {
        this.reservas6.push(reserva);
        numeroReserva = this.reservas6.length;
      } else if (reserva.clase.horaInicio === horaInicio){
        this.reservas7.push(reserva);
        numeroReserva = this.reservas7.length;
      } else if (reserva.clase.horaInicio === horaInicio){
        this.reservas8.push(reserva);
        numeroReserva = this.reservas8.length;
      } else if (reserva.clase.horaInicio === horaInicio){
        this.reservas9.push(reserva);
        numeroReserva = this.reservas9.length;
      } else {
        numeroReserva = 0;
      }
    }
    return numeroReserva;
  }

  enviarReservas(reservas: Reserva[], horaInicio?: string){
    let reservaFinal = new Array();

    for (const reserva of reservas) {
      if (reserva.clase.horaInicio === horaInicio) {
        reservaFinal.push(reserva);
      }
    }
    return reservaFinal;
  }

  cargarClases() {
    this._claseService.cargarClases(this.DIAS[0].fecha, this.DIAS[5].fecha)
                          .subscribe((resp: any) =>{
                            console.log(this.DIAS[0].fecha, this.DIAS[5].fecha);
                            this.clases = resp.clases;
                          });
  }

  buscarClase(horaInicio: string, fecha: string){

    let fechaTmp = new Date(fecha).toISOString();

    for (const clase of this.clases) {
      if(clase.horaInicio === horaInicio
        && clase.fecha === fechaTmp){
        this.clase = clase;
        break;
      }else{
        this.clase = new Clase(null, null, null, null, null, null);
      }
    }
    return this.clase;
  }

  obtenerFechaActual(){

    let fecha;

    if(this.fecha.getMonth() < 10){
      if(this.fecha.getDate() < 10){
        fecha = this.fecha.getFullYear() + '-' + 0 + (this.fecha.getMonth() + 1) + '-' +  0 + this.fecha.getDate();
        return fecha;
      }else{
        fecha = this.fecha.getFullYear() + '-' + 0 + (this.fecha.getMonth() + 1) + '-' +  this.fecha.getDate();
        return fecha;
      }
    }else{
      if(this.fecha.getDate() < 10){
        fecha = this.fecha.getFullYear() + '-' + (this.fecha.getMonth() + 1) + '-' +  0 + this.fecha.getDate();
        return fecha;
      }else{
        fecha = this.fecha.getFullYear() + '-' + (this.fecha.getMonth() + 1) + '-' +  this.fecha.getDate();
        return fecha;
      }
    }
  }
}
