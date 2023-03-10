import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableSharedLocationComponent } from './editable-shared-location.component';

describe('EditableSharedLocationComponent', () => {
  let component: EditableSharedLocationComponent;
  let fixture: ComponentFixture<EditableSharedLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditableSharedLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableSharedLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
