import { Component, OnInit } from '@angular/core';
import { IngresoViewModel } from 'src/app/models/ingreso/ingreso-view-model';
import { RegistroIngresoComponent } from '../registro-ingreso/registro-ingreso.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IngresoService } from 'src/app/services/ingreso/ingreso.service';

@Component({
  selector: 'app-ingresos-list',
  templateUrl: './ingresos-list.component.html',
  styleUrls: ['./ingresos-list.component.css']
})
export class IngresosListComponent implements OnInit {

  constructor(private modalService: NgbModal,
    private ingresoService: IngresoService) { }

  ngOnInit() {
    this.loadIngresos();
  }

  ingresos: IngresoViewModel[] = [];
  loadIngresos() {
    //"subscribe" para hacer peticion hacia servidor de firebase
    this.ingresoService.getIngresos().subscribe(response => {
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
  }

  clickAddIngreso() {
    const modal = this.modalService.open(RegistroIngresoComponent);    
    modal.result.then(
      this.handleModalIngresoFormClose.bind(this),
      this.handleModalIngresoFormClose.bind(this)
    );
  }

  handleModalIngresoFormClose(response) {
    //is response an object?
    if (response == Object(response)) {
      if (response.createMode) {
        response.ingreso.id = response.id;
        this.ingresos.unshift(response.ingreso);
      } else {
        let index = this.ingresos.findIndex(value => value.id == response.id);
        this.ingresos[index] = response.ingreso;
      }
    }
  }

  // checkedDone(index: number) {
  //   const newDoneValue = !this.ingresos[index].done
  //   this.ingresos[index].done = newDoneValue;
  //   const obj = { done: newDoneValue };
  //   const id = this.ingresos[index].id
  //   this.ingresoService.editIngresoPartial(id, obj);
  // }

  handleEditClick(ingreso: IngresoViewModel) {
    const modal = this.modalService.open(RegistroIngresoComponent);
    modal.result.then(
      this.handleModalIngresoFormClose.bind(this),
      this.handleModalIngresoFormClose.bind(this)
    )
    modal.componentInstance.createMode = false;
    modal.componentInstance.ingreso = ingreso;
  }

  handleDeleteClick(ingresoId: string, index: number) {
    this.ingresoService.deleteIngreso(ingresoId)
      .then(() => {
        this.ingresos.splice(index, 1);
      })
      .catch(err => console.error(err));
  }
}