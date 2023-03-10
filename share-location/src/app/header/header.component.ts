import { ShareLocationService } from '../shared/services/share-location.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private showShareLocation = false;

  public constructor(private service: ShareLocationService) {}

  public ngOnInit(): void {
    this.service.showSharedLocations.next(this.showShareLocation);
  }

  public changeShowShareLocation(): void {
    this.showShareLocation = !this.showShareLocation;
    this.service.showSharedLocations.next(this.showShareLocation);
  }
}
