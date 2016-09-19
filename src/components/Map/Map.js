import React from 'react';
import styles from './Map.css';
import { createMarkerOverlay } from '../../helpers/googleMap';

class Map extends React.Component {
  static get contextTypes() {
    return {
      google: React.PropTypes.object.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.initMap = this.initMap.bind(this);
    this.initMarkerOverlay = this.initMarkerOverlay.bind(this);
    this.renderMap = this.renderMap.bind(this);
    this.renderMarkerOverlay = this.renderMarkerOverlay.bind(this);
    this.setMapNode = this.setMapNode.bind(this);
  }

  componentDidMount() {
    this.initMap();
    this.initMarkerOverlay();
  }

  componentDidUpdate() {
    this.renderMap();
    this.renderMarkerOverlay();
  }

  initMap() {
    const google = this.context.google;
    this.map = new google.maps.Map(this.mapNode, {
      center: this.props.center,
      mapTypeControl: false,
      streetViewControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT,
      },
      zoom: 12,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT,
      },
    });
    this.renderMap();
  }
  
  initMarkerOverlay() {
    const google = this.context.google;
    this.markerOverlay = createMarkerOverlay(google);
    this.renderMarkerOverlay();
  }

  renderMap() {
    if (!this.props.items.length) return;

    const google = this.context.google;
    const bounds = new google.maps.LatLngBounds();
    this.props.items.forEach((item) => {
      bounds.extend({
        lat: item.location.coordinate.lat,
        lng: item.location.coordinate.lng,
      });
    });
    this.map.fitBounds(bounds);
  }
  
  renderMarkerOverlay() {
    const coordinates = this.props.items.map((item) => {
      return {
        lat: item.location.coordinate.lat,
        lng: item.location.coordinate.lng,
      };
    });
    this.markerOverlay.setMap(null);
    this.markerOverlay.setCoordinates(coordinates);
    this.markerOverlay.setMap(this.map);
  }

  setMapNode(node) {
    this.mapNode = node;
  }

  render() {
    return (
      <div className={styles.map} ref={this.setMapNode} />
    );
  }
}

export default Map;
