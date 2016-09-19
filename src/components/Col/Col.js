import classNames from 'classnames';
import React from 'react';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import styles from './Col.css';

const DEVICE_SIZES = ['xs', 'sm', 'md', 'lg'];
const SUFFIXES = ['', 'Offset', 'Pull', 'Push'];

class Col extends React.Component {
  static get propTypes() {
    return {
      stripPadding: React.PropTypes.bool,
      xs: React.PropTypes.number,
      sm: React.PropTypes.number,
      md: React.PropTypes.number,
      lg: React.PropTypes.number,
      xsHidden: React.PropTypes.bool,
      smHidden: React.PropTypes.bool,
      mdHidden: React.PropTypes.bool,
      lgHidden: React.PropTypes.bool,
      xsOffset: React.PropTypes.number,
      smOffset: React.PropTypes.number,
      mdOffset: React.PropTypes.number,
      lgOffset: React.PropTypes.number,
      xsPull: React.PropTypes.number,
      smPull: React.PropTypes.number,
      mdPull: React.PropTypes.number,
      lgPull: React.PropTypes.number,
      xsPush: React.PropTypes.number,
      smPush: React.PropTypes.number,
      mdPush: React.PropTypes.number,
      lgPush: React.PropTypes.number,
    };
  }

  render() {
    const classes = [];
    DEVICE_SIZES.forEach((size) => {
      SUFFIXES.forEach((suffix) => {
        const value = this.props[`${size}${suffix}`];
        if (value > 0 && value <= 12) {
          const key = size + (suffix !== '' ? `-${suffix.toLowerCase()}` : '');
          classes.push(Bootstrap[['col', key, value].join('-')]);
        }
      });

      const suffix = 'Hidden';
      const value = this.props[`${size}${suffix}`];
      if (value) {
        classes.push(Bootstrap[`hidden-${size}`]);
      }
    });
    const className = classNames(classes, {[styles.stripPadding]: this.props.stripPadding}, this.props.className);

    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }
}

export default Col;
