import { Injectable } from '@angular/core';

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

  constructor() {
    this.platform = new H.service.Platform({
      'app_id': 'BJVXDaaQP1vlUYnwyeMc',
      'app_code': 'IBhx7t7ZiR0N-_3S1_xH-w'
    });
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
