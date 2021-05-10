import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiFlightComponent } from './modifi-flight.component';

describe('ModifiFlightComponent', () => {
  let component: ModifiFlightComponent;
  let fixture: ComponentFixture<ModifiFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifiFlightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifiFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
