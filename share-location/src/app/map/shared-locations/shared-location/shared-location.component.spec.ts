import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedLocationComponent } from './shared-location.component';

describe('SharedLocationComponent', () => {
  let component: SharedLocationComponent;
  let fixture: ComponentFixture<SharedLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
