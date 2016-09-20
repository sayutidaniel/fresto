import React from 'react';
import { connect } from 'react-redux';
import Map from '../components/Map/Map';

class MapContainer extends React.Component {
  static get propTypes() {
    return {
      center: React.PropTypes.object,
      query: React.PropTypes.objectOf(React.PropTypes.string),
      items: React.PropTypes.array,
    };
  }

  render() {
    const query = this.props.query;
    let center = this.props.center;

    if (query.coordinate) {
      const coordinate = query.coordinate.split(',');
      center = {
        lat: parseFloat(coordinate[0]),
        lng: parseFloat(coordinate[1]),
      };
    }

    return (
      center && <Map center={center} items={this.props.items} />
    );
  }
}

export default connect(state => ({
  center: state.search.center,
  items: state.search.items,
}))(MapContainer);
