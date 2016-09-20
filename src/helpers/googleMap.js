/* eslint-env browser */
import classNames from 'classnames';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import styles from '../components/Tooltip/Tooltip.css';

const GOOGLE_MAP_API_KEY = process.env.GOOGLE_MAP_API_KEY;

export function loadGoogleMapAPI() {
  if (window.google) return Promise.resolve(window.google);

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      resolve(window.google);
    };
    document.body.appendChild(script);
  });
}

export function createMarkerOverlay(google, coords) {
  class MarkerOverlay extends google.maps.OverlayView {
    constructor(coordinates = []) {
      super();
      this.coordinates = coordinates;
      this.tooltips = [];
    }

    setCoordinates(coordinates) {
      this.coordinates = coordinates;
    }

    onAdd() {
      const panes = this.getPanes();
      this.tooltips = this.coordinates.map((coordinate, index) => {
        const tooltip = document.createElement('div');
        const tooltipArrow = document.createElement('div');
        const tooltipInner = document.createElement('div');

        tooltip.className = classNames(
          styles.tooltip,
          Bootstrap.tooltip,
          Bootstrap.top,
          Bootstrap.in
        );
        tooltipArrow.className = classNames(
          styles.tooltipArrow,
          Bootstrap['tooltip-arrow']
        );
        tooltipInner.className = classNames(
          styles.tooltipInner,
          Bootstrap['tooltip-inner']
        );
        tooltipInner.innerHTML = index + 1;
        tooltip.appendChild(tooltipArrow);
        tooltip.appendChild(tooltipInner);
        panes.overlayLayer.appendChild(tooltip);

        return tooltip;
      });
    }

    draw() {
      const projection = this.getProjection();
      this.coordinates.forEach(({ lat, lng }, index) => {
        const tooltip = this.tooltips[index];
        const point = projection.fromLatLngToDivPixel(new google.maps.LatLng(lat, lng));
        tooltip.style.left = `${point.x - tooltip.offsetWidth / 2}px`;
        tooltip.style.top = `${point.y - tooltip.offsetHeight}px`;
      });
    }

    onRemove() {
      this.tooltips.forEach((tooltip) => {
        tooltip.parentNode.removeChild(tooltip);
      });
    }
  }
  return new MarkerOverlay(coords);
}
