import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroUsuarioComponent } from './component/registro-usuario/registro-usuario.component';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './component/main/main.component';
import { IngresosListComponent } from './component/ingresos/ingresos-list/ingresos-list.component';



const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistroUsuarioComponent },
  {
    path: 'home', component: HomeComponent, children: [
      { path: '', component: IngresosListComponent },
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
