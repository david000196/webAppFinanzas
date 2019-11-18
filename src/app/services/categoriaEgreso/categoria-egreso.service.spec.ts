import { TestBed } from '@angular/core/testing';

import { CategoriaEgresoService } from './categoria-egreso.service';

describe('CategoriaEgresoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoriaEgresoService = TestBed.get(CategoriaEgresoService);
    expect(service).toBeTruthy();
  });
});
