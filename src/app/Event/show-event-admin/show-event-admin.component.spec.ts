import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEventAdminComponent } from './show-event-admin.component';

describe('ShowEventAdminComponent', () => {
  let component: ShowEventAdminComponent;
  let fixture: ComponentFixture<ShowEventAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowEventAdminComponent]
    });
    fixture = TestBed.createComponent(ShowEventAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
