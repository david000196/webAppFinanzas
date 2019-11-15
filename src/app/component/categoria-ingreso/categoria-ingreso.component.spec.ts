import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaIngresoComponent } from './categoria-ingreso.component';

describe('CategoriaIngresoComponent', () => {
  let component: CategoriaIngresoComponent;
  let fixture: ComponentFixture<CategoriaIngresoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaIngresoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
