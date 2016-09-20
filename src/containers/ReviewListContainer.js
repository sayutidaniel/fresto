import React from 'react';
import { connect } from 'react-redux';
import ReviewList from '../components/ReviewList/ReviewList';

class ReviewListContainer extends React.Component {
  static get propTypes() {
    return {
      reviews: React.PropTypes.array,
    };
  }

  render() {
    return (
      <ReviewList reviews={this.props.reviews} />
    );
  }
}

export default connect((state) => {
  const item = state.restaurant.item;

  return {
    reviews: item && item.reviews,
  };
})(ReviewListContainer);
