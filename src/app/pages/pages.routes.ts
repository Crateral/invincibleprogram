import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RegisterComponent } from './register/register.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { PlanesComponent } from './planes/planes.component';
import { ClasesComponent } from './clases/clases.component';
import { ReservasComponent } from './reservas/reservas.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent, 
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'graficas1', component: Graficas1Component },
            { path: 'account-settings', component: AccountSettingsComponent },
            { path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de usuario'}},
            { path: 'administrarUsuarios', component: RegisterComponent, data: {titulo: 'Administacion de usuarios'} },
            { path: 'administrarPlanes', component: PlanesComponent, data: {titulo: 'Administracion de planes'}},
            { path: 'administrarClases', component: ClasesComponent, data: {titulo: 'Administracion de clases'}},
            { path: 'administrarReservas', component: ReservasComponent, data: {titulo: 'Administracion de reservas'}},
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
