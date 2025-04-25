import { TestBed } from '@angular/core/testing';

import { LivreurService } from './livreur.service';

describe('LivreurService', () => {
  let service: LivreurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivreurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
