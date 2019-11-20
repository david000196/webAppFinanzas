import { Component, OnInit } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClasificacionIngresoViewModel } from 'src/app/models/categoriaIngreso/categoria-ingreso-view-model';
import { ClasificacionIngreso } from 'src/app/models/categoriaIngreso/categoria-ingreso';
import { CategoriaIngresoService } from 'src/app/services/categoriaIngreso/categoria-ingreso.service';
import { AuthenticationService } from '../../../service/authentication.service';

@Component({
  selector: 'app-registro-categoria-ingreso',
  templateUrl: './registro-categoria-ingreso.component.html',
  styleUrls: ['./registro-categoria-ingreso.component.css']
})
export class RegistroCategoriaIngresoComponent implements OnInit {

  categoriaIngresoForm: FormGroup;
  //DICE SI EL USUARIO ESTA EDITANDO O CREANDO UNA TAREA
  createMode: boolean = true;
  //TAREA QUE EL USUARIO VA A EDITAR
  categoriaIngreso: ClasificacionIngresoViewModel;

  constructor(private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private categoriaIngresoService: CategoriaIngresoService,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.categoriaIngresoForm = this.formBuilder.group({
      nombre: ['', Validators.required]
    });

    if (!this.createMode) {
      this.loadCategoriacategoriaIngreso(this.categoriaIngreso);
    }
  }

  loadCategoriacategoriaIngreso(categoria) {
    this.categoriaIngresoForm.patchValue(categoria);
  }

  saveCategoriaIngreso() {
    if (this.categoriaIngresoForm.invalid) {
      return;
    }

    if (this.createMode) {
      let categoriaIngreso: ClasificacionIngreso = this.categoriaIngresoForm.value;
      categoriaIngreso.uid=this.authService.isUserLoggedIn().uid;
      this.categoriaIngresoService.saveCategoriaIngreso(categoriaIngreso)
        .then(response => this.handleSuccessfulSaveCategoriaIngreso(response, this.categoriaIngreso))
        .catch(err => console.error(err));
    } else {
      let categoriaIngreso: ClasificacionIngresoViewModel = this.categoriaIngresoForm.value;
      categoriaIngreso.uid=this.authService.isUserLoggedIn().uid;
      categoriaIngreso.id = this.categoriaIngreso.id;
      this.categoriaIngresoService.editCategoriaIngreso(categoriaIngreso)
        .then(() => this.handleSuccessfulEditCategoriaIngreso(categoriaIngreso))
        .catch(err => console.error(err));
    }

  }

  handleSuccessfulSaveCategoriaIngreso(response: DocumentReference, categoriaIngreso: ClasificacionIngreso) {
    this.activeModal.dismiss({ Ingreso: categoriaIngreso, id: response.id, createMode: true });
  }

  handleSuccessfulEditCategoriaIngreso(categoriaIngreso: ClasificacionIngresoViewModel) {
    this.activeModal.dismiss({ categoriaIngreso: categoriaIngreso, id: categoriaIngreso.id, createMode: false });
  }
}