import { TestBed } from '@angular/core/testing';

import { GeografiaService } from './geografia.service';

describe('GeografiaService', () => {
  let service: GeografiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeografiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
