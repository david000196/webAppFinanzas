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
import { CategoriaIngresoComponent } from './component/categoria-ingreso/categoria-ingreso.component';
import { MenuComponent } from './component/menu/menu.component';
import { EgresosListComponent } from './component/egresos/egresos-list/egresos-list.component';
import { IngresosListComponent } from './component/ingresos/ingresos-list/ingresos-list.component';
import { HeaderComponent } from './component/header/header.component';
import { MainComponent } from './component/main/main.component';
import { FooterComponent } from './component/footer/footer.component';
import { BodyComponent } from './component/body/body.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CategoriaEgresoComponent } from './component/categoria-egreso/categoria-egreso.component';
import { RegistroCategoriaComponent } from './component/categoria-ingreso/registro-categoria/registro-categoria.component';
import { RegistroEgresoCategoriaComponent } from './component/categoria-egreso/registro-egreso-categoria/registro-egreso-categoria.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroUsuarioComponent,
    RegistroIngresoComponent,
    RegistroEgresoComponent,
    HomeComponent,
    CategoriaIngresoComponent,
    MenuComponent,
    EgresosListComponent,
    IngresosListComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    BodyComponent,
    DashboardComponent,
    CategoriaEgresoComponent,
    RegistroCategoriaComponent,
    RegistroEgresoCategoriaComponent
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
    RegistroCategoriaComponent,
    CategoriaEgresoComponent,
    RegistroEgresoCategoriaComponent
  ]
})
export class AppModule { }
