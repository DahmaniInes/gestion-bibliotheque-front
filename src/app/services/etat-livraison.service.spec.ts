import { TestBed } from '@angular/core/testing';

import { EtatLivraisonService } from './etat-livraison.service';

describe('EtatLivraisonService', () => {
  let service: EtatLivraisonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtatLivraisonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
