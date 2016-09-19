import classNames from 'classnames';
import React from 'react';
import PageButton from '../PageButton/PageButton';
import styles from "./Pagination.css";

class Pagination extends React.Component {
  static get propTypes() {
    return {
      max: React.PropTypes.number,
      length: React.PropTypes.number.isRequired,
      value: React.PropTypes.number,
      onChange: React.PropTypes.func
    };
  }
  
  static get defaultProps() {
    return {
      max: 3,
      value: 1,
    };
  }
  
  render() {
    const {
      max,
      length,
      value,
      onChange,
      className,
    } = this.props;

    if (length === 0) return null;

    const pages = [];
    const halfMax = Math.floor(max / 2);
    const prevPages = value - halfMax;
    const nextPages = value + halfMax;
    const start = Math.min(Math.max(1, prevPages), Math.max(1, length - max + 1));
    const end = Math.min(Math.max(max, nextPages), length);

    pages.push(<PageButton key="first" label="First" value={1} onClick={onChange} />);
    pages.push(<PageButton key="prev" label="Prev" value={Math.max(1, value - 1)} onClick={onChange} />);
    if (start > 1) {
      pages.push(<PageButton key={1} value={1} onClick={onChange} />);
      if (start > 2) {
        pages.push(<div key='prevEllipsis' className={styles.ellipsis} />);
      }
    }

    for (let page=start; page<=end; page++) {
      pages.push(<PageButton key={page} active={page === value} value={page} onClick={onChange} />);
    }

    if (end < length) {
      if (end < length - 1) {
        pages.push(<div key='nextEllipsis' className={styles.ellipsis} />);
      }
      pages.push(<PageButton key={length} value={length} onClick={onChange} />);
    }
    pages.push(<PageButton key="next" label="Next" value={Math.min(length, value + 1)} onClick={onChange} />);
    pages.push(<PageButton key="last" label="Last" value={length} onClick={onChange} />);

    return (
      <div className={classNames(className, styles.pagination)}>
        {pages}
      </div>
    );
  }
}

export default Pagination;
