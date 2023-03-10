import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedLocation } from './../../../shared/models/shared-location';

@Component({
  selector: 'app-shared-location',
  templateUrl: './shared-location.component.html',
  styleUrls: ['./shared-location.component.scss'],
})
export class SharedLocationComponent {
  @Input()
  public sharedLocation!: SharedLocation;

  @Output()
  public show = new EventEmitter<SharedLocation>();

  @Output()
  public delete = new EventEmitter<SharedLocation>();

  @Output()
  public edit = new EventEmitter<SharedLocation>();
}
