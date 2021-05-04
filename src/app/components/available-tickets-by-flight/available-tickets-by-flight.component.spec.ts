import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableTicketsByFlightComponent } from './available-tickets-by-flight.component';

describe('AvailableTicketsByFlightComponent', () => {
  let component: AvailableTicketsByFlightComponent;
  let fixture: ComponentFixture<AvailableTicketsByFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableTicketsByFlightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableTicketsByFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
