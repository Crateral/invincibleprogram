import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Crear Usuarios', url: '/crearUsuario' },
        { titulo: 'Administrar Usuarios', url: '/progress' }
      ]
    },
    {
      titulo: 'Planes',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Crear plan', url: '/progress'},
        { titulo: 'Ver resultados', url: '/graficas1'}
      ]
    }
  ];

  constructor() { }
}
