import { Component, OnInit } from '@angular/core';
import { ClasificacionIngresoViewModel } from 'src/app/models/categoriaIngreso/categoria-ingreso-view-model';
import { DocumentReference } from '@angular/fire/firestore';
import { ClasificacionIngreso } from 'src/app/models/categoriaIngreso/categoria-ingreso';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { CategoriaService } from 'src/app/services/categoria/categoria.service';

@Component({
  selector: 'app-registro-categoria',
  templateUrl: './registro-categoria.component.html',
  styleUrls: ['./registro-categoria.component.css']
})
export class RegistroCategoriaComponent implements OnInit {

  categoriaForm: FormGroup;
  //DICE SI EL USUARIO ESTA EDITANDO O CREANDO UNA TAREA
  createMode: boolean = true;
  //TAREA QUE EL USUARIO VA A EDITAR
  categoria: ClasificacionIngreso;

  constructor(private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal/*,
    private categoriaService: CategoriaService*/) { }

  ngOnInit() {
    this.categoriaForm = this.formBuilder.group({
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
      categoriaCategoria: ['', Validators.required],
    });

    if (!this.createMode) {
      this.loadCategoria(this.categoria);
    }
  }

  loadCategoria(categoria) {
    this.categoriaForm.patchValue(categoria);
  }

  saveCategoria() {
    if (this.categoriaForm.invalid) {
      return;
    }

    if (this.createMode) {
      let categoria: ClasificacionIngreso = this.categoriaForm.value;
      /*this.categoriaService.saveCategoria(categoria)
        .then(response => this.handleSuccessfulSaveCategoria(response, categoria))
        .catch(err => console.error(err));*/
    } else {
      let categoria: ClasificacionIngresoViewModel = this.categoriaForm.value;
      categoria.nombre = this.categoria.nombre.toString();
      /*this.categoriaService.editCategoria(categoria)
        .then(() => this.handleSuccessfulEditCategoria(categoria))
        .catch(err => console.error(err));*/
    }

  }

  handleSuccessfulSaveCategoria(response: DocumentReference, categoria: ClasificacionIngresoViewModel) {
    this.activeModal.dismiss({ categoria: categoria, id: response.id, createMode: true });
  }

  handleSuccessfulEditCategoria(categoria: ClasificacionIngreso) {
    this.activeModal.dismiss({ categoria: categoria, nombre: categoria.nombre});
  }
}