import { ShareLocationService } from '../shared/services/share-location.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { LocationPosition } from '../shared/models/location-position';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  public createNewSharedLocation = false;
  public newSharedLocationPosition?: LocationPosition;

  private readonly accessToken =
    'pk.eyJ1IjoicnNhbmdpbiIsImEiOiJjbGYwd3h4azQwMnR2M3luemk4aDBmdGd4In0.pWe77-xoN8zQ2gLoE-C6Fg';
  private readonly initialZoom = 15;
  //london location
  private readonly initialCenter: LocationPosition = {
    lat: 51.509865,
    lon: -0.118092,
  };
  private readonly minZoom = 3;
  private readonly maxZoom = 20;
  private currentLocationMarker?: mapboxgl.Marker;

  private map!: mapboxgl.Map;

  public constructor(public service: ShareLocationService) {}

  public ngAfterViewInit(): void {
    mapboxgl.setRTLTextPlugin('/assets/scripts/mapbox-rtl.js', () => {});

    this.map = new mapboxgl.Map({
      accessToken: this.accessToken,
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v12',
      attributionControl: false,
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
    });

    this.map.on('dblclick', (event) => {
      event.preventDefault();
      const position = event.lngLat;

      this.currentLocationMarker?.remove();
      this.currentLocationMarker = this.addMarker({
        lat: position.lat,
        lon: position.lng,
      });
    });

    this.flyToCurrentLocation();
    this.loadSharedLocations();
  }

  private loadSharedLocations(): void {
    const locations = this.service.loadLocations();
    for (const location of locations) {
      this.addMarker(location.position, 'blue');
    }
  }

  public async flyToCurrentLocation(): Promise<void> {
    const currentLocation = await this.getCurrentLocation();
    const center = currentLocation ?? this.initialCenter;

    this.currentLocationMarker?.remove();
    this.currentLocationMarker = this.addMarker(center);

    this.showLocation(center);
  }

  public showLocation(center: LocationPosition) {
    this.map.flyTo({ center, zoom: this.initialZoom });
  }

  private addMarker(
    position: LocationPosition,
    color = 'red'
  ): mapboxgl.Marker {
    const marker = new mapboxgl.Marker({ color });

    marker.setLngLat(position).addTo(this.map);
    return marker;
  }

  private async getCurrentLocation(): Promise<LocationPosition | null> {
    return new Promise<LocationPosition | null>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (resp) =>
          resolve({ lon: resp.coords.longitude, lat: resp.coords.latitude }),
        () => resolve(null)
      );
    });
  }

  public shareCurrentLocation(): void {
    this.createNewSharedLocation = true;
    this.service.showSharedLocations.next(true);

    const latlng = this.currentLocationMarker?.getLngLat();
    if (latlng)
      this.newSharedLocationPosition = { lat: latlng.lat, lon: latlng.lng };
  }

  public clearNewSharedLocation(): void {
    this.createNewSharedLocation = false;
    this.newSharedLocationPosition = undefined;
  }
}
