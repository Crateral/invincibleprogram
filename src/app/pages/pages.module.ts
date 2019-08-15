import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { RegisterComponent } from './register/register.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { PlanesComponent } from './planes/planes.component';
import { ClasesComponent } from './clases/clases.component';
import { ModalPlanComponent } from '../components/modals/modalPlan/modalPlan.component';
import { ModalUsuarioComponent } from '../components/modals/modalUsuario/modalUsuario.component';
import { ModalClaseComponent } from '../components/modals/modalClase/modalClase.component';
import { ModalClaseActualizarComponent } from '../components/modals/modalClase/modalClaseActualizar.component';
import { ReservasComponent } from './reservas/reservas.component';
import { ModalReservaAdmComponent } from '../components/modals/modalReservaAdm/modalReservaAdm.component';
import { ModalReservaAdmCrearComponent } from '../components/modals/modalReservaAdm/modalReservaAdmCrear.component';
import { ReservasUsuarioComponent } from './reservasUsuario/reservasUsuario.component';
import { ModalClaseUsuarioComponent } from '../components/modals/modalClaseUsuario/modalClaseUsuario.component';
import { ReservasCoachComponent } from './reservasCoach/reservasCoach.component';
import { PlanUsuarioComponent } from './planUsuario/planUsuario.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        RegisterComponent,
        ProfileComponent,
        PlanesComponent,
        ClasesComponent,
        ModalPlanComponent,
        ModalUsuarioComponent,
        ModalClaseComponent,
        ModalClaseActualizarComponent,
        ReservasComponent,
        ModalReservaAdmComponent,
        ModalReservaAdmCrearComponent,
        ReservasUsuarioComponent,
        ModalClaseUsuarioComponent,
        ReservasCoachComponent,
        PlanUsuarioComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ReactiveFormsModule,
        ChartsModule,
        PipesModule,
        CommonModule
    ]
})

export class PagesModule {}