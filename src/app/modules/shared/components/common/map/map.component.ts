import { Component, OnInit, Input, AfterViewInit, OnChanges, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { Location } from 'src/app/core/models/Location.model';
import { MapService } from 'src/app/modules/shared/services/map.service';
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

  loaded: boolean = false;
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
        this.loaded = isLoaded;
        if (isLoaded) {
          this.mapService.initMap(this.mapWrapper.nativeElement);
          this.mapService.geocode(this.location.name + ', Bulgaria');
          this.unsubscribe();
        }
      });
    }
  }

  unsubscribe() {
    if (this.sub) this.sub.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.location) {
      if (this.loaded) {
        this.mapService.geocode(this.location.name + ', Bulgaria');
      }
    }
  }

  public fullscreenMode(v: boolean) {
    this.fullscreen = v;
    console.log('Fullscreen is not implemented yet');
  }

}
