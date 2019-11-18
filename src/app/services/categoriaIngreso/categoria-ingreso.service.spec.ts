import { TestBed } from '@angular/core/testing';

import { CategoriaIngresoService } from './categoria-ingreso.service';

describe('CategoriaIngresoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoriaIngresoService = TestBed.get(CategoriaIngresoService);
    expect(service).toBeTruthy();
  });
});
