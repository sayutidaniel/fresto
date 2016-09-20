import React from 'react';
import Col from '../Col/Col';
import Pagination from '../Pagination/Pagination';
import SearchResultItem from './SearchResultItem';
import styles from './SearchResult.css';

class SearchResult extends React.Component {
  static get propTypes() {
    return {
      /**
       * A list of search result items
       */
      items: React.PropTypes.array,
      /**
       * Current search result page number
       */
      page: React.PropTypes.number,
      /**
       * Total of available search result items
       */
      total: React.PropTypes.number,
      /**
       * Callback fired when page number is changed
       */
      onPageChange: React.PropTypes.func,
    };
  }

  render() {
    return (
      <div>
        <Col xs={12} className={styles.searchResultInfo}>
          <span>Found <strong>{this.props.total}</strong> restaurants</span>
        </Col>
        {this.props.items && this.props.items.map((item, index) => (
          <SearchResultItem key={index} {...item} />
        ))}
        <Col xs={12}>
          <Pagination
            className={styles.pagination}
            length={Math.ceil(this.props.total / 20)}
            value={this.props.page}
            onChange={this.props.onPageChange}
          />
        </Col>
      </div>
    );
  }
}

export default SearchResult;
