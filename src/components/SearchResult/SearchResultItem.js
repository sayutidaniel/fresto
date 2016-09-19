import classNames from 'classnames';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Link } from 'react-router';
import Col from '../Col/Col';
import styles from './SearchResultItem.css';

class SearchResultItem extends React.Component {
  static get propTypes() {
    return {
      id: React.PropTypes.string.isRequired,
      categories: React.PropTypes.array,
      imageUrl: React.PropTypes.string,
      name: React.PropTypes.string.isRequired,
      location: React.PropTypes.shape({
        displayAddress: React.PropTypes.string,
      }),
      ratingImgUrl: React.PropTypes.string,
      reviewCount: React.PropTypes.number,
    };
  }

  render() {
    return (
      <Col stripPadding xs={12}>
        <Link className={styles.container} to={`/restaurant/${this.props.id}`}>
          <div className={styles.sectionLeft}>
            <img className={styles.businessPhoto} src={this.props.imageUrl} />
          </div>
          <div className={styles.sectionRight}>
            <div className={styles.businessName}>{this.props.name}</div>
            {this.props.categories && <div className={styles.categories}>{this.props.categories.map((category) => category.title)}</div>}
            <div className={styles.address}>{this.props.location.displayAddress}</div>
            {this.props.displayPhone && (
              <div className={styles.phone}>
                <span className={classNames(Bootstrap.glyphicon, Bootstrap['glyphicon-earphone'])} />
                {' '}
                {this.props.displayPhone}
              </div>
            )}
            <div className={styles.rating}>
              <img src={this.props.ratingImgUrl} />
              <span> · </span>
              <span>{this.props.reviewCount} reviews</span>
            </div>
          </div>
        </Link>
      </Col>
    );
  }
}

export default SearchResultItem;
