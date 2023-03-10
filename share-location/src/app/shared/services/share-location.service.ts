import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { CreateSharedLocationRequest } from './../models/create-shared-location-request';
import { SharedLocation } from './../models/shared-location';
import { UpdateSharedLocationRequest } from './../models/update-shared-location-request';

@Injectable({ providedIn: 'root' })
export class ShareLocationService {
  public showSharedLocations = new BehaviorSubject(false);

  private readonly storageKey = 'locashare-shared-locations';

  public constructor(private storage: Storage) {}

  public loadLocations(): SharedLocation[] {
    const sharedLocationsStringify = this.storage.getItem(this.storageKey);
    return sharedLocationsStringify ? JSON.parse(sharedLocationsStringify) : [];
  }

  public create(request: CreateSharedLocationRequest): SharedLocation {
    const locations = this.loadLocations();

    const location = request as SharedLocation;
    location.id = uuidv4();
    locations.unshift(location);

    this.saveLocations(locations);
    return location;
  }

  public delete(id: string): boolean {
    const locations = this.loadLocations();
    const index = locations.findIndex((x) => x.id === id);

    if (index > -1) {
      locations.splice(index, 1);
      this.saveLocations(locations);
      return true;
    }

    return false;
  }

  public update(request: UpdateSharedLocationRequest): void {
    const locations = this.loadLocations();
    const location = locations.find((x) => x.id === request.id);

    if (location) {
      Object.assign(location, request);
      this.saveLocations(locations);
    }
  }

  private saveLocations(locations: SharedLocation[]): void {
    this.storage.setItem(this.storageKey, JSON.stringify(locations));
  }
}
