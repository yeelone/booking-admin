import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanteenDialogComponent } from './canteen-dialog.component';

describe('CanteenDialogComponent', () => {
  let component: CanteenDialogComponent;
  let fixture: ComponentFixture<CanteenDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanteenDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanteenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
