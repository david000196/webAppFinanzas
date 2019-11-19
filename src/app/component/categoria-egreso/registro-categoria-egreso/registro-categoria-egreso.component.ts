import { Component, OnInit } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaEgresoViewModel } from 'src/app/models/categoriaEgreso/categoria-egreso-view-model';
import { CategoriaEgreso } from 'src/app/models/categoriaEgreso/categoria-egreso';
import { CategoriaEgresoService } from 'src/app/services/categoriaEgreso/categoria-egreso.service';

@Component({
  selector: 'app-registro-categoria-egreso',
  templateUrl: './registro-categoria-egreso.component.html',
  styleUrls: ['./registro-categoria-egreso.component.css']
})
export class RegistroCategoriaEgresoComponent implements OnInit {

  categoriaEgresoForm: FormGroup;
  //DICE SI EL USUARIO ESTA EDITANDO O CREANDO UNA TAREA
  createMode: boolean = true;
  //TAREA QUE EL USUARIO VA A EDITAR
  categoriaEgreso: CategoriaEgresoViewModel;

  constructor(private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private categoriaEgresoService: CategoriaEgresoService) { }

  ngOnInit() {
    this.categoriaEgresoForm = this.formBuilder.group({
      nombre: ['', Validators.required]
    });

    if (!this.createMode) {
      this.loadCategoriacategoriaEgreso(this.categoriaEgreso);
    }
  }

  loadCategoriacategoriaEgreso(categoria) {
    this.categoriaEgresoForm.patchValue(categoria);
  }

  saveCategoriaEgreso() {
    if (this.categoriaEgresoForm.invalid) {
      return;
    }

    if (this.createMode) {
      let categoriaEgreso: CategoriaEgreso = this.categoriaEgresoForm.value;
      this.categoriaEgresoService.saveCategoriaEgreso(categoriaEgreso)
        .then(response => this.handleSuccessfulSaveCategoriaEgreso(response, this.categoriaEgreso))
        .catch(err => console.error(err));
    } else {
      let categoriaEgreso: CategoriaEgresoViewModel = this.categoriaEgresoForm.value;
      categoriaEgreso.id = this.categoriaEgreso.id;
      this.categoriaEgresoService.editCategoriaEgreso(categoriaEgreso)
        .then(() => this.handleSuccessfulEditCategoriaEgreso(categoriaEgreso))
        .catch(err => console.error(err));
    }

  }

  handleSuccessfulSaveCategoriaEgreso(response: DocumentReference, categoriaEgreso: CategoriaEgreso) {
    this.activeModal.dismiss({ Egreso: categoriaEgreso, id: response.id, createMode: true });
  }

  handleSuccessfulEditCategoriaEgreso(categoriaEgreso: CategoriaEgresoViewModel) {
    this.activeModal.dismiss({ categoriaEgreso: categoriaEgreso, id: categoriaEgreso.id, createMode: false });
  }
}