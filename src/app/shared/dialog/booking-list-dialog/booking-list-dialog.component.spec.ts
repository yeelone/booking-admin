import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingListDialogComponent } from './booking-list-dialog.component';

describe('BookingListDialogComponent', () => {
  let component: BookingListDialogComponent;
  let fixture: ComponentFixture<BookingListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
