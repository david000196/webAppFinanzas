import { Component, OnInit } from '@angular/core';
import { EgresoViewModel } from 'src/app/models/egreso/egreso-view-model';
import { EgresoService } from 'src/app/services/egreso/egreso.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistroEgresoComponent } from '../registro-egreso/registro-egreso.component';

@Component({
  selector: 'app-egresos-list',
  templateUrl: './egresos-list.component.html',
  styleUrls: ['./egresos-list.component.css']
})
export class EgresosListComponent implements OnInit {

  constructor(private modalService: NgbModal,
    private egresoService: EgresoService) { }

  ngOnInit() {
    this.loadEgresos();
  }

  egresos: EgresoViewModel[] = [];
  loadEgresos() {
    //"subscribe" para hacer peticion hacia servidor de firebase
    this.egresoService.getEgresos().subscribe(response => {
      this.egresos = [];
      response.docs.forEach(value => {
        const data = value.data();
        const id = value.id;
        const egreso: EgresoViewModel = {
          id: id,
          fecha: data.fecha,
          descripcion: data.descripcion,
          monto: data.monto,
          categoriaEgreso: data.categoriaEgreso
        };
        this.egresos.push(egreso);
      });
    });
  }

  clickAddEgreso() {
    const modal = this.modalService.open(RegistroEgresoComponent);
    modal.result.then(
      this.handleModalEgresoFormClose.bind(this),
      this.handleModalEgresoFormClose.bind(this)
    );
  }

  handleModalEgresoFormClose(response) {
    //is response an object?
    if (response == Object(response)) {
      if (response.createMode) {
        response.egreso.id = response.id;
        this.egresos.unshift(response.Egreso);
      } else {
        let index = this.egresos.findIndex(value => value.id == response.id);
        this.egresos[index] = response.Egreso;
      }
    }
  }

  // checkedDone(index: number) {
  //   const newDoneValue = !this.egresos[index].done
  //   this.egresos[index].done = newDoneValue;
  //   const obj = { done: newDoneValue };
  //   const id = this.egresos[index].id
  //   this.egresoService.editEgresoPartial(id, obj);
  // }

  handleEditClick(egreso: EgresoViewModel) {
    const modal = this.modalService.open(RegistroEgresoComponent);
    modal.result.then(
      this.handleModalEgresoFormClose.bind(this),
      this.handleModalEgresoFormClose.bind(this)
    )
    modal.componentInstance.createMode = false;
    modal.componentInstance.egreso = egreso;
  }

  handleDeleteClick(egresoId: string, index: number) {
    this.egresoService.deleteEgreso(egresoId)
      .then(() => {
        this.egresos.splice(index, 1);
      })
      .catch(err => console.error(err));
  }
}