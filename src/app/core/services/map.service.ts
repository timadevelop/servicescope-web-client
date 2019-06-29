import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { BehaviorSubject } from 'rxjs';

declare var H: any;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private platform: any;
  private defaultLayers: any;
  private map: any;
  private ui: any;
  private bubble: any;
  private group: any;

  public hereMapsLoaded$ = new BehaviorSubject(null);
  public loading: boolean = true;

  constructor(
    private configService: ConfigService
  ) {
    this.loadHereMaps();
  }

  private hereApiLibs = [
    'http://js.api.here.com/v3/3.0/mapsjs-core.js',
    'http://js.api.here.com/v3/3.0/mapsjs-service.js',
    'http://js.api.here.com/v3/3.0/mapsjs-ui.js',

  ];

  loadHereMaps(): void {
    this.configService.currentConfig().subscribe(c => {
      this.loadJs(this.hereApiLibs);
    });
  }

  private callback() {
    this.platform = new H.service.Platform({
      'app_id': 'BJVXDaaQP1vlUYnwyeMc',
      'app_code': 'IBhx7t7ZiR0N-_3S1_xH-w'
    });
    this.hereMapsLoaded$.next(true);
    this.loading = false;
  }

  private loadJs(urls, index = 0) {
    const that = this;
    return (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = urls[index];
      js.onload = () => {
        if (urls.length == index + 1) {
          that.callback();
        } else {
          that.loadJs(urls, index + 1);
        }
      }
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', `hereAPI${index}`));
  }

  initMap(htmlElement): any {
    this.defaultLayers = this.platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    this.map = new H.Map(
      htmlElement,
      this.defaultLayers.normal.map,
      {
        zoom: 8,
        center: { lat: 52.5, lng: 13.4 }
      });

    this.ui = H.ui.UI.createDefault(this.map, this.defaultLayers);
    return this.map;
  }

  geocode(searchText) {
    var geocoder = this.platform.getGeocodingService(),
      geocodingParameters = {
        searchText: searchText,
        jsonattributes: 1
      };

    geocoder.geocode(
      geocodingParameters,
      result => {
        let locations = result.response.view[0].result;
        this.addLocationsToMap(locations);
      },
      error => {
        console.log('Can\'t reach the remote server', error);
      }
    );
  }

  addLocationsToMap(locations) {
    let group = new H.map.Group(),
      position,
      i;

    // Add a marker for each location found
    for (i = 0; i < locations.length; i += 1) {
      position = {
        lat: locations[i].location.displayPosition.latitude,
        lng: locations[i].location.displayPosition.longitude
      };
      let marker = new H.map.Marker(position);
      marker.label = locations[i].location.address.label;
      group.addObject(marker);
    }

    group.addEventListener('tap', (evt) => {
      this.map.setCenter(evt.target.getPosition());
      this.openBubble(
        evt.target.getPosition(), evt.target.label);
    }, false);

    // remove old group
    if (this.group) {
      this.map.removeObject(this.group);
    }
    // Add the locations group to the map
    this.map.addObject(group);
    this.map.setCenter(group.getBounds().getCenter());
    this.group = group;
  }

  openBubble(position, text) {
    if (!this.bubble) {
      this.bubble = new H.ui.InfoBubble(
        position,
        { content: text });
      this.ui.addBubble(this.bubble);
    } else {
      this.bubble.setPosition(position);
      this.bubble.setContent(text);
      this.bubble.open();
    }
  }
}
