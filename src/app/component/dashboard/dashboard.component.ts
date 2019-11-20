import { Component, OnInit } from '@angular/core';
import { IngresoService } from 'src/app/services/ingreso/ingreso.service';
import { Ingreso } from 'src/app/models/ingreso/ingreso';
import { IngresoViewModel } from 'src/app/models/ingreso/ingreso-view-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ingresos:Ingreso[]=[]
  constructor(private ingresoService: IngresoService) { 
    this.ingresoService.getIngresosAnio().subscribe(response => {
      this.ingresos = [];      
      response.docs.forEach(value => {
        const data = value.data();
        const id = value.id;
        const ingreso: IngresoViewModel = {
          id: id,
          fecha: data.fecha,
          descripcion: data.descripcion,
          monto: data.monto,
          categoriaIngreso: data.categoriaIngreso,
          periodo: data.periodo
        };
        this.ingresos.push(ingreso);
      });
    });
    console.log(this.ingresos);
    
  }

  ngOnInit() {
  }

}
