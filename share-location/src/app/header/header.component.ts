import { ShareLocationService } from '../shared/services/share-location.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private showShareLocation = false;
  private subscription?: Subscription;

  public constructor(private service: ShareLocationService) {}

  public ngOnInit(): void {
    this.service.showSharedLocations.next(this.showShareLocation);

    this.subscription = this.service.showSharedLocations.subscribe(
      (result) => (this.showShareLocation = result)
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public changeShowShareLocation(): void {
    this.showShareLocation = !this.showShareLocation;
    this.service.showSharedLocations.next(this.showShareLocation);
  }
}
