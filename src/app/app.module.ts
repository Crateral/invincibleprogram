import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//RUTAS
import { APP_ROUTES } from './app.routes';

//MODULES  
import { PagesModule } from '../app/pages/pages.module';

//COMPONENTS
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './login/register.component';

import { ServiceModule } from './services/service.module';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
