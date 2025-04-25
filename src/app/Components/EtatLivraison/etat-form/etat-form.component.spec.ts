import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatFormComponent } from './etat-form.component';

describe('EtatFormComponent', () => {
  let component: EtatFormComponent;
  let fixture: ComponentFixture<EtatFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtatFormComponent]
    });
    fixture = TestBed.createComponent(EtatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
