import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistroCategoriaComponent } from './registro-categoria/registro-categoria.component';

@Component({
  selector: 'app-categoria-ingreso',
  templateUrl: './categoria-ingreso.component.html',
  styleUrls: ['./categoria-ingreso.component.css']
})
export class CategoriaIngresoComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
  
  clickAddIngreso() {
    const modal = this.modalService.open(RegistroCategoriaComponent);    
    modal.result.then(
      //ngthis.handleModalIngresoFormClose.bind(this),
      //this.handleModalIngresoFormClose.bind(this)
    );
  }
}
