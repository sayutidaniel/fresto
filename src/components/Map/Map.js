import React from 'react';
import styles from './Map.css';
import { createMarkerOverlay } from '../../helpers/googleMap';

class Map extends React.Component {
  static get contextTypes() {
    return {
      /**
       * Loaded google map library
       */
      google: React.PropTypes.object.isRequired,
    };
  }

  static get propTypes() {
    return {
      /**
       * Center position of map consisting longitude and latitude
       */
      center: React.PropTypes.object,
      /**
       * A list of markers geo location
       */
      items: React.PropTypes.array,
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

  /**
   * Store a reference of map DOM element
   *
   * @param {HTMLElement} node
   */
  setMapNode(node) {
    this.mapNode = node;
  }

  /**
   * Initialize and render google map
   */
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

  /**
   * Initialize overlay view for drawing custom markers and render them to the map
   */
  initMarkerOverlay() {
    const google = this.context.google;
    this.markerOverlay = createMarkerOverlay(google);
    this.renderMarkerOverlay();
  }

  /**
   * Render a map to center bounds of markers
   */
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

  /**
   * Render all of markers to map overlay view
   */
  renderMarkerOverlay() {
    const coordinates = this.props.items.map(item => ({
      lat: item.location.coordinate.lat,
      lng: item.location.coordinate.lng,
    }));
    this.markerOverlay.setMap(null);
    this.markerOverlay.setCoordinates(coordinates);
    this.markerOverlay.setMap(this.map);
  }

  render() {
    return (
      <div className={styles.map} ref={this.setMapNode} />
    );
  }
}

export default Map;
