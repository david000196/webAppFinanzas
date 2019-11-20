import { Component, OnInit } from '@angular/core';
import { Egreso } from 'src/app/models/egreso/egreso';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { EgresoService } from 'src/app/services/egreso/egreso.service';
import { EgresoViewModel } from 'src/app/models/egreso/egreso-view-model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentReference } from '@angular/fire/firestore';
import { CategoriaEgresoService } from 'src/app/services/categoriaEgreso/categoria-egreso.service';
import { CategoriaEgresoViewModel } from 'src/app/models/categoriaEgreso/categoria-egreso-view-model';

@Component({
  selector: 'app-registro-egreso',
  templateUrl: './registro-egreso.component.html',
  styleUrls: ['./registro-egreso.component.css']
})
export class RegistroEgresoComponent implements OnInit {

  egresoForm: FormGroup;
  //DICE SI EL USUARIO ESTA EDITANDO O CREANDO UNA TAREA
  createMode: boolean = true;
  //TAREA QUE EL USUARIO VA A EDITAR
  egreso: EgresoViewModel;
  //LISTA CATEGORIAS EGRESOS
  categoriaEgresos: CategoriaEgresoViewModel[] = [];


  constructor(private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private egresoService: EgresoService,
    private categoriaEgresoService: CategoriaEgresoService) { }

  ngOnInit() {
    this.egresoForm = this.formBuilder.group({
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
      categoriaEgreso: ['', Validators.required],
      periodo: ['', Validators.required]
    });
    this.loadCategoriaEgresos();

    if (!this.createMode) {
      this.loadEgreso(this.egreso);
    }
  }

  loadEgreso(egreso) {
    this.egresoForm.patchValue(egreso);
  }

  saveEgreso() {
    if (this.egresoForm.invalid) {
      return;
    }

    if (this.createMode) {
      console.log(this.egresoForm.value);
      
      let egreso: Egreso = this.egresoForm.value;
      this.egresoService.saveEgreso(egreso)
        .then(response => this.handleSuccessfulSaveEgreso(response, egreso))
        .catch(err => console.error(err));
    } else {
      let egreso: EgresoViewModel = this.egresoForm.value;
      egreso.id = this.egreso.id;
      this.egresoService.editEgreso(egreso)
        .then(() => this.handleSuccessfulEditEgreso(egreso))
        .catch(err => console.error(err));
    }

  }

  handleSuccessfulSaveEgreso(response: DocumentReference, egreso: Egreso) {
    this.activeModal.dismiss({ Egreso: egreso, id: response.id, createMode: true });
  }

  handleSuccessfulEditEgreso(egreso: EgresoViewModel) {
    this.activeModal.dismiss({ egreso: egreso, id: egreso.id, createMode: false });
  }

  loadCategoriaEgresos() {
    //"subscribe" para hacer peticion hacia servidor de firebase
    this.categoriaEgresoService.getCategoriaEgresos().subscribe(response => {
      this.categoriaEgresos = [];
      response.docs.forEach(value => {
        const data = value.data();
     //   console.log(data);
        
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
}