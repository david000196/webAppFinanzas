import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaIngresoListComponent } from './categoria-ingreso-list.component';

describe('CategoriaIngresoListComponent', () => {
  let component: CategoriaIngresoListComponent;
  let fixture: ComponentFixture<CategoriaIngresoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaIngresoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaIngresoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
