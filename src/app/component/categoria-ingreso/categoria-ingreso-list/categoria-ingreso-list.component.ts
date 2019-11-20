import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistroCategoriaIngresoComponent } from '../registro-categoria-ingreso/registro-categoria-ingreso.component';
import { CategoriaIngresoService } from 'src/app/services/categoriaIngreso/categoria-ingreso.service';
import { ClasificacionIngresoViewModel } from 'src/app/models/categoriaIngreso/categoria-ingreso-view-model';

@Component({
  selector: 'app-categoria-ingreso-list',
  templateUrl: './categoria-ingreso-list.component.html',
  styleUrls: ['./categoria-ingreso-list.component.css']
})
export class CategoriaIngresoListComponent implements OnInit {

  constructor(private modalService: NgbModal,
    private categoriaIngresoService: CategoriaIngresoService) { }

  ngOnInit() {
    this.loadCategoriaIngresos();
  }

  categoriaIngresos: ClasificacionIngresoViewModel[] = [];
  loadCategoriaIngresos() {
    //"subscribe" para hacer peticion hacia servidor de firebase
    this.categoriaIngresoService.getCategoriaIngresos().subscribe(response => {
      this.categoriaIngresos = [];
      response.docs.forEach(value => {
        const data = value.data();
        const id = value.id;
        if(data.uid==JSON.parse(localStorage.getItem('user')).uid)
        {
          const categoriaIngreso: ClasificacionIngresoViewModel = {
            id: id,
            nombre: data.nombre,
            uid:data.uid
          };
          this.categoriaIngresos.push(categoriaIngreso);
        }        
      });
    });
  }

  clickAddCategoriaIngreso() {
    const modal = this.modalService.open(RegistroCategoriaIngresoComponent);
    modal.result.then(
      this.handleModalCategoriaIngresoFormClose.bind(this),
      this.handleModalCategoriaIngresoFormClose.bind(this)
    );
  }

  handleModalCategoriaIngresoFormClose(response) {
    //is response an object?
    if (response == Object(response)) {
      if (response.createMode) {
        response.categoriaIngreso.id = response.id;
        this.categoriaIngresos.unshift(response.CategoriaIngreso);
      } else {
        let index = this.categoriaIngresos.findIndex(value => value.id == response.id);
        this.categoriaIngresos[index] = response.CategoriaIngreso;
      }
    }
  }


  handleEditClick(categoriaIngreso: ClasificacionIngresoViewModel) {
    const modal = this.modalService.open(RegistroCategoriaIngresoComponent);
    modal.result.then(
      this.handleModalCategoriaIngresoFormClose.bind(this),
      this.handleModalCategoriaIngresoFormClose.bind(this)
    )
    modal.componentInstance.createMode = false;
    modal.componentInstance.categoriaIngreso = categoriaIngreso;
  }

  handleDeleteClick(categoriaIngresoId: string, index: number) {
    this.categoriaIngresoService.deleteCategoriaIngreso(categoriaIngresoId)
      .then(() => {
        this.categoriaIngresos.splice(index, 1);
      })
      .catch(err => console.error(err));
  }
}