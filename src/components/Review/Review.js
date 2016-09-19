import moment from 'moment';
import React from 'react';
import styles from './Review.css';

class Review extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <img className={styles.userPhoto} src={this.props.user.imageUrl} />
        <div className={styles.userName}>{this.props.user.name}</div>
        <small className={styles.timeCreated}>{moment(this.props.timeCreated * 1000).fromNow()}</small>
        <div className={styles.rating}>
          <span className={styles.ratingScore}>{this.props.rating}</span>
          <span className={styles.maxScore}> / 5</span>
        </div>
        <p>{this.props.excerpt}</p>
      </div>
    );
  }
}

export default Review;
