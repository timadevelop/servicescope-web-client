import { Component, OnInit, Input, AfterViewInit, OnChanges, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { Location } from 'src/app/core/models/Location.model';
import { MapService } from 'src/app/core/services/map.service';

declare var H: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() location: Location;
  @Input() fullscreen: boolean = false;

  @ViewChild('mapWrapper') mapWrapper: ElementRef;

  constructor(
    private mapService: MapService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (this.mapWrapper) {
      this.mapService.initMap(this.mapWrapper.nativeElement);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.location) {
      this.mapService.geocode(this.location.name + ', Bulgaria');
    }
  }

  public fullscreenMode(v: boolean) {
    this.fullscreen = v;
    console.log('Fullscreen is not implemented yet');
  }

}
