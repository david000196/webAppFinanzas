import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistroCategoriaEgresoComponent } from '../registro-categoria-egreso/registro-categoria-egreso.component';
import { CategoriaEgresoService } from 'src/app/services/categoriaEgreso/categoria-egreso.service';
import { CategoriaEgresoViewModel } from 'src/app/models/categoriaEgreso/categoria-egreso-view-model';

@Component({
  selector: 'app-categoria-egreso-list',
  templateUrl: './categoria-egreso-list.component.html',
  styleUrls: ['./categoria-egreso-list.component.css']
})
export class CategoriaEgresoListComponent implements OnInit {

  constructor(private modalService: NgbModal,
    private categoriaEgresoService: CategoriaEgresoService) { }

  ngOnInit() {
    this.loadCategoriaEgresos();
  }

  categoriaEgresos: CategoriaEgresoViewModel[] = [];
  loadCategoriaEgresos() {
    //"subscribe" para hacer peticion hacia servidor de firebase
    this.categoriaEgresoService.getCategoriaEgresos().subscribe(response => {
      this.categoriaEgresos = [];
      response.docs.forEach(value => {
        const data = value.data();
        if(data.uid==JSON.parse(localStorage.getItem('user')).uid)
        {
          const id = value.id;
          const categoriaEgreso: CategoriaEgresoViewModel = {
          id: id,
          nombre: data.nombre,
          uid: data.uid
        };
        this.categoriaEgresos.push(categoriaEgreso);
        }        
      });
    });
  }

  clickAddCategoriaEgreso() {
    const modal = this.modalService.open(RegistroCategoriaEgresoComponent);
    modal.result.then(
      this.handleModalCategoriaEgresoFormClose.bind(this),
      this.handleModalCategoriaEgresoFormClose.bind(this)
    );
  }

  handleModalCategoriaEgresoFormClose(response) {
    //is response an object?
    if (response == Object(response)) {
      if (response.createMode) {
        response.categoriaEgreso.id = response.id;
        this.categoriaEgresos.unshift(response.CategoriaEgreso);
      } else {
        let index = this.categoriaEgresos.findIndex(value => value.id == response.id);
        this.categoriaEgresos[index] = response.CategoriaEgreso;
      }
    }
  }


  handleEditClick(categoriaEgreso: CategoriaEgresoViewModel) {
    const modal = this.modalService.open(RegistroCategoriaEgresoComponent);
    modal.result.then(
      this.handleModalCategoriaEgresoFormClose.bind(this),
      this.handleModalCategoriaEgresoFormClose.bind(this)
    )
    modal.componentInstance.createMode = false;
    modal.componentInstance.categoriaEgreso = categoriaEgreso;
  }

  handleDeleteClick(categoriaEgresoId: string, index: number) {
    this.categoriaEgresoService.deleteCategoriaEgreso(categoriaEgresoId)
      .then(() => {
        this.categoriaEgresos.splice(index, 1);
      })
      .catch(err => console.error(err));
  }
}