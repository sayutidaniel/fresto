import classNames from 'classnames';
import React from 'react';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import styles from './Select.css';

class Select extends React.Component {
  render() {
    const props = Object.assign({}, this.props);
    const className = classNames(
      Bootstrap['form-control'],
      styles.formControl,
      this.props.className
    );
    delete props.className;

    return (
      <select className={className} {...props} />
    );
  }
}

export default Select;
