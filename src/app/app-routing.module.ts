import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroUsuarioComponent } from './component/registro-usuario/registro-usuario.component';
import { HomeComponent } from './pages/home/home.component';
import { IngresosListComponent } from './component/ingresos/ingresos-list/ingresos-list.component';
import { CategoriaIngresoListComponent } from './component/categoria-ingreso/categoria-ingreso-list/categoria-ingreso-list.component';
import { EgresosListComponent } from './component/egresos/egresos-list/egresos-list.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CategoriaEgresoListComponent } from './component/categoria-egreso/categoria-egreso-list/categoria-egreso-list.component';
import { NotFound404Component } from './pages/not-found404/not-found404.component';



const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistroUsuarioComponent },
  {
    path: 'home', component: HomeComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'ingresos', component: IngresosListComponent },
      { path: 'egresos', component: EgresosListComponent },
      { path: 'categoriaIngreso', component: CategoriaIngresoListComponent },
      { path: 'categoriaEgreso', component: CategoriaEgresoListComponent },


    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: '**', component: NotFound404Component }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
