import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllEventsComponent } from './show-all-events.component';

describe('ShowAllEventsComponent', () => {
  let component: ShowAllEventsComponent;
  let fixture: ComponentFixture<ShowAllEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowAllEventsComponent]
    });
    fixture = TestBed.createComponent(ShowAllEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
