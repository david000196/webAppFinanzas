import { Component, OnInit } from '@angular/core';
import { IngresoService } from 'src/app/services/ingreso/ingreso.service';
import { EgresoService } from 'src/app/services/egreso/egreso.service';
import { Ingreso } from 'src/app/models/ingreso/ingreso';
import { IngresoViewModel } from 'src/app/models/ingreso/ingreso-view-model';
import { auth } from 'firebase';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  textValue = 'initial value';
  monthValue = '';
  yearValue = '';
  public rIngQI: number;
  public rIngQII: number;
  public rIngQT: number;
  public rGasQI: number;
  public rGasQII: number;
  public rGasQT: number;
  public eIngQI: number;
  public eIngQII: number;
  public eIngQT: number;
  public eGasQI: number;
  public eGasQII: number;
  public eGasQT: number;
  public aux: number;
  
  userDetails: any;
  ingresos:Ingreso[]=[]
  constructor(
    private ingresoService: IngresoService,
    private egresoService: EgresoService
  ) { 
    this.userDetails = JSON.parse(localStorage.getItem('user'));
    console.log(localStorage.getItem("userId"));
      //"subscribe" para hacer peticion hacia servidor de firebase
      this.getIngresos("2019");
      this.getEgresos("2019")
  }

  ngOnInit() {
  }
  public byYear(){
    this.rIngQI = 0;
    this.rIngQII = 0;
    this.rIngQT = 0;
    this.rGasQI = 0;
    this.rGasQII = 0;
    this.rGasQT = 0;
    return this.getIngresosXyear();
    return this.getEgresosXyear();
  }
  public byMonth(){
    this.rIngQI = 0;
    this.rIngQII = 0;
    this.rIngQT = 0;
    this.rGasQI = 0;
    this.rGasQII = 0;
    this.rGasQT = 0;
    return this.getIngresosXmonth();
    return this.getEgresosXmonth();
  }
  public getIngresosXyear(){
    return this.getIngresos(this.yearValue);
  }
  public getIngresosXmonth(){
    return this.getIngresos(this.monthValue);
  }
  public getEgresosXyear(){
    return this.getIngresos(this.yearValue);
  }
  public getEgresosXmonth(){
    return this.getIngresos(this.monthValue);
  }
  public getIngresos(fecha: string){
    
    this.ingresoService.getIngresosAnio().subscribe(response => {
      this.ingresos = [];      
      response.docs.forEach(value => {
        const data = value.data();
        console.log(data);
        if(data.fecha.indexOf(fecha) > -1)
        {
          this.aux = data.monto;
          this.rIngQT=this.rIngQT+this.aux;
          if(data.periodo=="0"){
            this.rIngQI=this.rIngQI+data.monto;
          }
          else if(data.periodo=="1"){
            this.rIngQII=this.rIngQII+data.monto;
          }
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
  public getEgresos(fecha: string){
    this.egresoService.getEgresosX().subscribe(response => {
      this.ingresos = [];      
      response.docs.forEach(value => {
        const data = value.data();
        console.log(data);
        if(data.fecha.indexOf(fecha) > -1)
        {
          this.rGasQT=this.rGasQT+data.monto;
          if(data.periodo=="0"){
            this.rGasQI=this.rGasQI+data.monto;
          }
          else if(data.periodo=="1"){
            this.rGasQII=this.rGasQII+data.monto;
          }
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
}
