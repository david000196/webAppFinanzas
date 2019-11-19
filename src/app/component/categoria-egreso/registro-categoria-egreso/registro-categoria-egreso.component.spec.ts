import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEgresoCategoriaComponent } from './registro-categoria-egreso.component';

describe('RegistroEgresoCategoriaComponent', () => {
  let component: RegistroEgresoCategoriaComponent;
  let fixture: ComponentFixture<RegistroEgresoCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroEgresoCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEgresoCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
