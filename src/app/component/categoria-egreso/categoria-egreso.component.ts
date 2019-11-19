import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistroEgresoCategoriaComponent } from './registro-egreso-categoria/registro-egreso-categoria.component';

@Component({
  selector: 'app-categoria-egreso',
  templateUrl: './categoria-egreso.component.html',
  styleUrls: ['./categoria-egreso.component.css']
})
export class CategoriaEgresoComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
  
  clickAddIngreso() {
    const modal = this.modalService.open(RegistroEgresoCategoriaComponent);    
    modal.result.then(
      //ngthis.handleModalIngresoFormClose.bind(this),
      //this.handleModalIngresoFormClose.bind(this)
    );
  }
}
