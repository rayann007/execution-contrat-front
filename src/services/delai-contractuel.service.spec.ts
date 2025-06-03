import { TestBed } from '@angular/core/testing';

import { DelaiContractuelService } from './delai-contractuel.service';

describe('DelaiContractuelService', () => {
  let service: DelaiContractuelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelaiContractuelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
