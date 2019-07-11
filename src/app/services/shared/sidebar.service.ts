import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Administracion',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Administrar Usuarios', url: '/administrarUsuarios' },
        { titulo: 'Administrar Planes', url: '/administrarPlanes' },
        { titulo: 'Administrar Clases', url: '/administrarClases' }
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
