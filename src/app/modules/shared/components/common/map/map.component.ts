import { Component, OnInit, Input, AfterViewInit, OnChanges, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { Location } from 'src/app/core/models/Location.model';
import { MapService } from 'src/app/core/services/map.service';
import { Subscription } from 'rxjs';

declare var H: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() location: Location;
  @Input() fullscreen: boolean = false;

  sub: Subscription;

  @ViewChild('mapWrapper') mapWrapper: ElementRef;

  constructor(
    public mapService: MapService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (this.mapWrapper) {
      this.sub = this.mapService.hereMapsLoaded$.subscribe(isLoaded => {
        if (isLoaded) {
          this.mapService.initMap(this.mapWrapper.nativeElement);
          this.mapService.geocode(this.location.name + ', Bulgaria');
          this.sub.unsubscribe();
          this.sub = null;
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.location) {
      if (!this.mapService.loading) {
        this.mapService.geocode(this.location.name + ', Bulgaria');
      }
    }
  }

  public fullscreenMode(v: boolean) {
    this.fullscreen = v;
    console.log('Fullscreen is not implemented yet');
  }

}
