import { TestBed } from '@angular/core/testing';

import { EstadioService } from './estadio.service';

describe('EstadioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstadioService = TestBed.get(EstadioService);
    expect(service).toBeTruthy();
  });
});
