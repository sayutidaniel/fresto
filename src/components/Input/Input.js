import classNames from 'classnames';
import React from 'react';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import styles from './Input.css';

class Input extends React.Component {
  render() {
    const props = Object.assign({}, this.props);
    const className = classNames(
      Bootstrap['form-control'],
      styles.formControl,
      this.props.className
    );
    delete props.className;

    return (
      <input className={className} {...this.props} />
    );
  }
}

export default Input;
