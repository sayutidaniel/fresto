import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import Col from '../../components/Col/Col';
import Container from '../../components/Container/Container';
import Row from '../../components/Row/Row';
import styles from './RestaurantInfo.css';

class RestaurantInfo extends React.Component {
  static get propTypes() {
    return {
      categories: React.PropTypes.arrayOf({
        title: React.PropTypes.string,
      }),
      displayPhone: React.PropTypes.string,
      imageUrl: React.PropTypes.string,
      location: React.PropTypes.shape({
        displayAddress: React.PropTypes.string,
      }),
      name: React.PropTypes.string,
      rating: React.PropTypes.number,
      ratingImgUrlLarge: React.PropTypes.string,
      reviewCount: React.PropTypes.number,
    };
  }

  render() {
    return (
      <Container className={styles.container}>
        <Row>
          <Col className={styles.sectionLeft} xs={12} md={4} lg={3}>
            <img
              alt={this.props.name}
              className={classNames(styles.thumbnail, Bootstrap.thumbnail)}
              src={this.props.imageUrl && this.props.imageUrl.replace(/ms\.jpg$/, 'ls.jpg')}
            />
            <Col mdHidden lgHidden>
              <div className={styles.smallRating}>
                <img alt={this.props.rating} src={this.props.ratingImgUrlLarge} />
                <div className={styles.smallReview}>{this.props.reviewCount} reviews</div>
              </div>
            </Col>
          </Col>
          <Col className={styles.sectionRight} xs={12} md={8} lg={9}>
            <Col xsHidden smHidden>
              <div className={styles.rating}>
                <img alt={this.props.rating} src={this.props.ratingImgUrlLarge} />
                <span> · </span>
                <span>{this.props.reviewCount} reviews</span>
              </div>
            </Col>
            <div className={styles.businessName}>{this.props.name}</div>
            {this.props.categories && (
              <div className={styles.categories}>
                {this.props.categories.map(category => category.title).join(', ')}
              </div>
            )}
            <div className={styles.address}>
              {this.props.location && this.props.location.displayAddress}
            </div>
            <div className={styles.phone}>
              <span className={classNames(Bootstrap.glyphicon, Bootstrap['glyphicon-earphone'])} />
              {' '}
              {this.props.displayPhone}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(state => (state.restaurant.item || {}))(RestaurantInfo);
