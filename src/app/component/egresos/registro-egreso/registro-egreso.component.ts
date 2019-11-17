import { Component, OnInit } from '@angular/core';
import { Egreso } from 'src/app/models/egreso/egreso';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { EgresoService } from 'src/app/services/egreso/egreso.service';
import { EgresoViewModel } from 'src/app/models/egreso/egreso-view-model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-registro-egreso',
  templateUrl: './registro-egreso.component.html',
  styleUrls: ['./registro-egreso.component.css']
})
export class RegistroEgresoComponent implements OnInit {

  EgresoForm: FormGroup;
  //DICE SI EL USUARIO ESTA EDITANDO O CREANDO UNA TAREA
  createMode: boolean = true;
  //TAREA QUE EL USUARIO VA A EDITAR
  Egreso: EgresoViewModel;

  constructor(private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private EgresoService: EgresoService) { }

  ngOnInit() {
    this.EgresoForm = this.formBuilder.group({
      fecha: ['', Validators.required],
      descipcion: ['', Validators.required],
      done: false
    });

    if (!this.createMode) {
      this.loadEgreso(this.Egreso);
    }
  }

  loadEgreso(Egreso) {
    this.EgresoForm.patchValue(Egreso);
  }

  saveEgreso() {
    if (this.EgresoForm.invalid) {
      return;
    }

    if (this.createMode) {
      let Egreso: Egreso = this.EgresoForm.value;
      this.EgresoService.saveEgreso(Egreso)
        .then(response => this.handleSuccessfulSaveEgreso(response, Egreso))
        .catch(err => console.error(err));
    } else {
      let Egreso: EgresoViewModel = this.EgresoForm.value;
      Egreso.id = this.Egreso.id;
      this.EgresoService.editEgreso(Egreso)
        .then(() => this.handleSuccessfulEditEgreso(Egreso))
        .catch(err => console.error(err));
    }

  }

  handleSuccessfulSaveEgreso(response: DocumentReference, Egreso: Egreso) {
    this.activeModal.dismiss({ Egreso: Egreso, id: response.id, createMode: true });
  }

  handleSuccessfulEditEgreso(Egreso: EgresoViewModel) {
    this.activeModal.dismiss({ Egreso: Egreso, id: Egreso.id, createMode: false });
  }
}