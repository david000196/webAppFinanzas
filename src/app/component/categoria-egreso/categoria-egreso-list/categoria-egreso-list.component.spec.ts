import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaEgresoListComponent } from './categoria-egreso-list.component';

describe('CategoriaEgresoListComponent', () => {
  let component: CategoriaEgresoListComponent;
  let fixture: ComponentFixture<CategoriaEgresoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaEgresoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaEgresoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
