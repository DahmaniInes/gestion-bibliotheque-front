import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreurDetailComponent } from './livreur-detail.component';

describe('LivreurDetailComponent', () => {
  let component: LivreurDetailComponent;
  let fixture: ComponentFixture<LivreurDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LivreurDetailComponent]
    });
    fixture = TestBed.createComponent(LivreurDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
