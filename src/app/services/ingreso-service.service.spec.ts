import { TestBed } from '@angular/core/testing';

import { IngresoServiceService } from './ingreso-service.service';

describe('IngresoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IngresoServiceService = TestBed.get(IngresoServiceService);
    expect(service).toBeTruthy();
  });
});
