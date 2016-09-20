import React from 'react';
import { connect } from 'react-redux';
import RestaurantInfo from '../components/RestaurantInfo/RestaurantInfo';

class RestaurantInfoContainer extends React.Component {
  static get propTypes() {
    return {
      restaurant: React.PropTypes.object,
    };
  }

  render() {
    return (
      <RestaurantInfo {...this.props.restaurant} />
    );
  }
}

export default connect(state => ({
  restaurant: state.restaurant.item,
}))(RestaurantInfoContainer);
