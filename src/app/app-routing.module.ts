import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegistroUsuarioComponent } from './component/registro-usuario/registro-usuario.component';
import { HomeComponent } from './pages/home/home.component';



const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistroUsuarioComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/login',pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
