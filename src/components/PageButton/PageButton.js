import classNames from 'classnames';
import React from 'react';
import styles from './PageButton.css';

class PageButton extends React.Component {
  static get propTypes() {
    return {
      active: React.PropTypes.bool,
      label: React.PropTypes.string,
      value: React.PropTypes.number.isRequired,
      onClick: React.PropTypes.func
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
      <div
        className={classNames(styles.pageButton, {[styles.active]: this.props.active})}
        onClick={this.handleClick}
      >
        {this.props.label || this.props.value}
      </div>
    );
  }
}

export default PageButton;
