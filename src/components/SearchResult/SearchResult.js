import React from 'react';
import Col from '../Col/Col';
import Pagination from '../Pagination/Pagination';
import SearchResultItem from './SearchResultItem';
import styles from './SearchResult.css';

class SearchResult extends React.Component {
  static get propTypes() {
    return {
      items: React.PropTypes.array,
      page: React.PropTypes.number,
      total: React.PropTypes.number,
      onPageChange: React.PropTypes.func,
    };
  }
  
  render() {
    return (
      <div>
        {<Col xs={12} className={styles.searchResultInfo}>Found <strong>{this.props.total}</strong> restaurants</Col>}
        {this.props.items && this.props.items.map((item, index) => {
          return (
            <SearchResultItem key={index} {...item} />
          );
        })}
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
