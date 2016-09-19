import React from 'react';
import { connect } from 'react-redux';
import RestaurantInfo from '../components/RestaurantInfo/RestaurantInfo';

class RestaurantInfoContainer extends React.Component {
  render() {
    return (
      <RestaurantInfo {...this.props.restaurant} />
    );
  }
}

export default connect((state) => {
  return {
    restaurant: state.restaurant.item,
  };
})(RestaurantInfoContainer);
