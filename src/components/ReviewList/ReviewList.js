import React from 'react';
import Col from '../Col/Col';
import Container from '../Container/Container';
import Row from '../Row/Row';
import Review from '../Review/Review';
import styles from './ReviewList.css';

class ReviewList extends React.Component {
  static get propTypes() {
    return {
      reviews: React.PropTypes.array,
    };
  }

  render() {
    const reviews = this.props.reviews || [];

    return (
      <Container>
        <Row>
          <Col xs={12}>
            <div className={styles.title}>{reviews.length} Reviews</div>
            {reviews.map((review, index) => (
              <Review key={index} {...review} />
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ReviewList;
