import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroIngresoCategoriaComponent } from './registro-categoria-ingreso.component';

describe('RegistroIngresoCategoriaComponent', () => {
  let component: RegistroIngresoCategoriaComponent;
  let fixture: ComponentFixture<RegistroIngresoCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroIngresoCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroIngresoCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
