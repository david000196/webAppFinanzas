import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { RegistroUsuarioComponent } from './component/registro-usuario/registro-usuario.component';
import { RegistroIngresoComponent } from './component/ingresos/registro-ingreso/registro-ingreso.component';
import { RegistroEgresoComponent } from './component/egresos/registro-egreso/registro-egreso.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoriaIngresoListComponent } from './component/categoria-ingreso/categoria-ingreso-list/categoria-ingreso-list.component';
import { MenuComponent } from './component/menu/menu.component';
import { EgresosListComponent } from './component/egresos/egresos-list/egresos-list.component';
import { IngresosListComponent } from './component/ingresos/ingresos-list/ingresos-list.component';
import { HeaderComponent } from './component/header/header.component';
import { MainComponent } from './component/main/main.component';
import { FooterComponent } from './component/footer/footer.component';
import { BodyComponent } from './component/body/body.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RegistroCategoriaIngresoComponent } from './component/categoria-ingreso/registro-categoria-ingreso/registro-categoria-ingreso.component';
import { CategoriaEgresoListComponent } from './component/categoria-egreso/categoria-egreso-list/categoria-egreso-list.component';
import { RegistroCategoriaEgresoComponent } from './component/categoria-egreso/registro-categoria-egreso/registro-categoria-egreso.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroUsuarioComponent,
    RegistroIngresoComponent,
    RegistroEgresoComponent,
    HomeComponent,
    CategoriaIngresoListComponent,
    MenuComponent,
    EgresosListComponent,
    IngresosListComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    BodyComponent,
    DashboardComponent,
    CategoriaEgresoListComponent,
    RegistroCategoriaIngresoComponent,
    RegistroCategoriaEgresoComponent
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
  bootstrap: [AppComponent],
  entryComponents: [
    RegistroIngresoComponent,
    RegistroEgresoComponent,
    RegistroUsuarioComponent,
    RegistroCategoriaIngresoComponent,
    RegistroCategoriaEgresoComponent,
    CategoriaIngresoListComponent
  ]
})
export class AppModule { }
