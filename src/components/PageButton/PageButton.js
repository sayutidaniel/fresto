import classNames from 'classnames';
import React from 'react';
import styles from './PageButton.css';

class PageButton extends React.Component {
  static get propTypes() {
    return {
      /**
       * Highlight the `PageButton` as active
       */
      active: React.PropTypes.bool,
      /**
       * Display label of the page button instead of its value
       */
      label: React.PropTypes.string,
      /**
       * Value passed to the `onClick` handler
       */
      value: React.PropTypes.number.isRequired,
      /**
       * Callback fired when the page button is clicked
       */
      onClick: React.PropTypes.func,
    };
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick && this.props.onClick(this.props.value);
  }

  render() {
    return (
      <button
        className={classNames(styles.pageButton, { [styles.active]: this.props.active })}
        type="button"
        onClick={this.handleClick}
      >
        {this.props.label || this.props.value}
      </button>
    );
  }
}

export default PageButton;
