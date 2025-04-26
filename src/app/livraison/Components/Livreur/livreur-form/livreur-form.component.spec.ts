import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreurFormComponent } from './livreur-form.component';

describe('LivreurFormComponent', () => {
  let component: LivreurFormComponent;
  let fixture: ComponentFixture<LivreurFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LivreurFormComponent]
    });
    fixture = TestBed.createComponent(LivreurFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
