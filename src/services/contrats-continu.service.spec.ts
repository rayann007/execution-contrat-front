import { TestBed } from '@angular/core/testing';

import { ContratsContinuService } from './contrats-continu.service';

describe('ContratsContinuService', () => {
  let service: ContratsContinuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContratsContinuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
