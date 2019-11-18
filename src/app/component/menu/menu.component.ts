import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  evtDashBoard() {
    this.router.navigate(['home/dashboard']);
  }
  evtIngresos() {
    this.router.navigate(['home/ingresos']);
  }
  evtEgresos() {
    this.router.navigate(['home/egresos']);
  }
  evtCategoriaIngresos() {
    this.router.navigate(['home/categoriaIngreso']);
  }
  evtCategoriaEgresos() {
    this.router.navigate(['home/categoriaEgreso']);
  }
}
