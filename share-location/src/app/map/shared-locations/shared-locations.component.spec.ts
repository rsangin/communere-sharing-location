import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedLocationsComponent } from './shared-locations.component';

describe('SharedLocationsComponent', () => {
  let component: SharedLocationsComponent;
  let fixture: ComponentFixture<SharedLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedLocationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
