import { Component, OnInit } from '@angular/core';
import { Ingreso } from 'src/app/models/ingreso/ingreso';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IngresoService } from 'src/app/services/ingreso/ingreso.service';
import { IngresoViewModel } from 'src/app/models/ingreso/ingreso-view-model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentReference } from '@angular/fire/firestore';
import { CategoriaIngresoService } from 'src/app/services/categoriaIngreso/categoria-ingreso.service';
import { ClasificacionIngresoViewModel } from 'src/app/models/categoriaIngreso/categoria-ingreso-view-model';
import { AuthenticationService } from '../../../service/authentication.service';

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
  //LISTA CATEGORIAS EGRESOS
  categoriaIngresos: ClasificacionIngresoViewModel[] = [];


  constructor(private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private ingresoService: IngresoService,
    private categoriaIngresoService: CategoriaIngresoService,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.ingresoForm = this.formBuilder.group({
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
      categoriaIngreso: ['', Validators.required],
      periodo: ['', Validators.required],
    });
    this.loadCategoriaIngresos();

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
      console.log(this.ingresoForm.value);
      
      let ingreso: Ingreso = this.ingresoForm.value;
      ingreso.uid=this.authService.isUserLoggedIn().uid;
      this.ingresoService.saveIngreso(ingreso)
        .then(response => this.handleSuccessfulSaveIngreso(response, ingreso))
        .catch(err => console.error(err));
    } else {
      let ingreso: IngresoViewModel = this.ingresoForm.value;
      ingreso.uid=this.authService.isUserLoggedIn().uid;
      ingreso.id = this.ingreso.id;
      this.ingresoService.editIngreso(ingreso)
        .then(() => this.handleSuccessfulEditIngreso(ingreso))
        .catch(err => console.error(err));
    }

  }

  handleSuccessfulSaveIngreso(response: DocumentReference, ingreso: Ingreso) {
    this.activeModal.dismiss({ Ingreso: ingreso, id: response.id, createMode: true });
  }

  handleSuccessfulEditIngreso(ingreso: IngresoViewModel) {
    this.activeModal.dismiss({ ingreso: ingreso, id: ingreso.id, createMode: false });
  }

  loadCategoriaIngresos() {
    //"subscribe" para hacer peticion hacia servidor de firebase
    this.categoriaIngresoService.getCategoriaIngresos().subscribe(response => {
      this.categoriaIngresos = [];
      response.docs.forEach(value => {
        const data = value.data();
     //   console.log(data);
     if(data.uid==JSON.parse(localStorage.getItem('user')).uid)
        {
          const id = value.id;
          const categoriaIngreso: ClasificacionIngresoViewModel = {
            id: id,
            nombre: data.nombre,
            uid: data.uid
          };
          this.categoriaIngresos.push(categoriaIngreso);
        }
      });
    });
  }
}