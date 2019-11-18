import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroUsuarioComponent } from './component/registro-usuario/registro-usuario.component';
import { HomeComponent } from './pages/home/home.component';
import { IngresosListComponent } from './component/ingresos/ingresos-list/ingresos-list.component';
import { CategoriaIngresoComponent } from './component/categoria-ingreso/categoria-ingreso.component';
import { EgresosListComponent } from './component/egresos/egresos-list/egresos-list.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CategoriaEgresoComponent } from './component/categoria-egreso/categoria-egreso.component';



const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistroUsuarioComponent },
  {
    path: 'home', component: HomeComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'ingresos', component: IngresosListComponent },
      { path: 'egresos', component: EgresosListComponent },
      { path: 'categoriaIngreso', component: CategoriaIngresoComponent },
      { path: 'categoriaEgreso', component: CategoriaEgresoComponent },


    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
