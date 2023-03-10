import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { SharedLocationsComponent } from './shared-locations/shared-locations.component';
import { SharedLocationComponent } from './shared-locations/shared-location/shared-location.component';
import { EditableSharedLocationComponent } from './shared-locations/editable-shared-location/editable-shared-location.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MapComponent,
    SharedLocationsComponent,
    SharedLocationComponent,
    EditableSharedLocationComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [MapComponent],
})
export class MapModule {}
