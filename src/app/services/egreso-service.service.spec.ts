import { TestBed } from '@angular/core/testing';

import { EgresoServiceService } from './egreso-service.service';

describe('EgresoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EgresoServiceService = TestBed.get(EgresoServiceService);
    expect(service).toBeTruthy();
  });
});
