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

    console.log(localStorage.getItem("userId"));
      //"subscribe" para hacer peticion hacia servidor de firebase
      this.ingresoService.getIngresosAnio().subscribe(response => {
        this.ingresos = [];      
        response.docs.forEach(value => {
          const data = value.data();
          console.log(data);
          if(data.uid==JSON.parse(localStorage.getItem('user')).uid)
          {
            const id = value.id;
            const ingreso: IngresoViewModel = {
              id: id,
              fecha: data.fecha,
              descripcion: data.descripcion,
              monto: data.monto,
              categoriaIngreso: data.categoriaIngreso,
              periodo: data.periodo,
              uid: data.uid
            };
            this.ingresos.push(ingreso);
          }        
        });
      });
  }

  ngOnInit() {
  }

}
