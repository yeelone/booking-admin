import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSellerDialogComponent } from './ticket-seller-dialog.component';

describe('TicketSellerDialogComponent', () => {
  let component: TicketSellerDialogComponent;
  let fixture: ComponentFixture<TicketSellerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketSellerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketSellerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
