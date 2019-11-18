import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaEgresoComponent } from './categoria-egreso.component';

describe('CategoriaEgresoComponent', () => {
  let component: CategoriaEgresoComponent;
  let fixture: ComponentFixture<CategoriaEgresoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaEgresoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaEgresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
