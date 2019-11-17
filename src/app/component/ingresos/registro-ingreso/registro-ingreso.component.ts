import { Component, OnInit } from '@angular/core';
import { IngresoViewModel } from 'src/app/models/ingreso/ingreso-view-model';
import { DocumentReference } from '@angular/fire/firestore';
import { Ingreso } from 'src/app/models/ingreso/ingreso';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoService } from 'src/app/services/ingreso/ingreso.service';

@Component({
  selector: 'app-registro-ingreso',
  templateUrl: './registro-ingreso.component.html',
  styleUrls: ['./registro-ingreso.component.css']
})
export class RegistroIngresoComponent implements OnInit {

  ingresoForm: FormGroup;
  //DICE SI EL USUARIO ESTA EDITANDO O CREANDO UNA TAREA
  createMode: boolean = true;
  //TAREA QUE EL USUARIO VA A EDITAR
  ingreso: IngresoViewModel;

  constructor(private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private ingresoService: IngresoService) { }

  ngOnInit() {
    this.ingresoForm = this.formBuilder.group({
      fecha: ['', Validators.required],
      descipcion: ['', Validators.required],
      done: false
    });

    if (!this.createMode) {
      this.loadIngreso(this.ingreso);
    }
  }

  loadIngreso(ingreso) {
    this.ingresoForm.patchValue(ingreso);
  }

  saveIngreso() {
    if (this.ingresoForm.invalid) {
      return;
    }

    if (this.createMode) {
      let ingreso: Ingreso = this.ingresoForm.value;
      this.ingresoService.saveIngreso(ingreso)
        .then(response => this.handleSuccessfulSaveIngreso(response, ingreso))
        .catch(err => console.error(err));
    } else {
      let ingreso: IngresoViewModel = this.ingresoForm.value;
      ingreso.id = this.ingreso.id;
      this.ingresoService.editIngreso(ingreso)
        .then(() => this.handleSuccessfulEditIngreso(ingreso))
        .catch(err => console.error(err));
    }

  }

  handleSuccessfulSaveIngreso(response: DocumentReference, ingreso: Ingreso) {
    this.activeModal.dismiss({ ingreso: ingreso, id: response.id, createMode: true });
  }

  handleSuccessfulEditIngreso(ingreso: IngresoViewModel) {
    this.activeModal.dismiss({ ingreso: ingreso, id: ingreso.id, createMode: false });
  }
}