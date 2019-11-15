import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './component/login/login.component';
import { RegistroUsuarioComponent } from './component/registro-usuario/registro-usuario.component';
import { RegistroIngresoComponent } from './component/ingresos/registro-ingreso/registro-ingreso.component';
import { RegistroEgresoComponent } from './component/egresos/registro-egreso/registro-egreso.component';
import { HomeComponent } from './component/home/home.component';
import { CategoriaIngresoComponent } from './component/categoria-ingreso/categoria-ingreso.component';
import { NavbarComponent } from './component/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroUsuarioComponent,
    RegistroIngresoComponent,
    RegistroEgresoComponent,
    HomeComponent,
    CategoriaIngresoComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
