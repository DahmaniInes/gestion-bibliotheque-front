import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivraisonDetailComponent } from './livraison-detail.component';

describe('LivraisonDetailComponent', () => {
  let component: LivraisonDetailComponent;
  let fixture: ComponentFixture<LivraisonDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LivraisonDetailComponent]
    });
    fixture = TestBed.createComponent(LivraisonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
