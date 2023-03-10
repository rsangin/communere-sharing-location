import { LocationPosition } from './../../shared/models/location-position';
import { ShareLocationService } from '../../shared/services/share-location.service';
import { SharedLocation } from '../../shared/models/shared-location';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-shared-locations',
  templateUrl: './shared-locations.component.html',
  styleUrls: ['./shared-locations.component.scss'],
})
export class SharedLocationsComponent implements OnInit {
  @Input()
  public createNew = false;

  @Input()
  public newSharedLocationPosition?: LocationPosition;

  @Input()
  public editableLocation?: SharedLocation;

  @Output()
  public showLocation = new EventEmitter<SharedLocation>();

  @Output()
  public submitted = new EventEmitter<void>();

  @Output()
  public reload = new EventEmitter<void>();

  public sharedLocations: SharedLocation[] = [];

  public constructor(private service: ShareLocationService) {}

  public ngOnInit(): void {
    this.loadSharedLocations();
  }

  private loadSharedLocations(): void {
    this.sharedLocations = this.service.loadLocations();
  }

  public delete(location: SharedLocation): void {
    this.service.delete(location.id);
    this.loadSharedLocations();
    this.reload.emit();
  }

  public edit(location: SharedLocation): void {
    this.editableLocation = location;
    this.newSharedLocationPosition = this.editableLocation.position;
  }

  public sharedLocationEdited(): void {
    this.createNew = false;
    this.editableLocation = undefined;
    this.newSharedLocationPosition = undefined;

    this.loadSharedLocations();
    this.submitted.emit();
    this.reload.emit();
  }
}
