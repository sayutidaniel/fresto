import classNames from 'classnames';
import React from 'react';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import styles from './Col.css';

const DEVICE_SIZES = [
  'xs', // Phones (<768px)
  'sm', // Tablets (>=768px)
  'md', // MDPI Desktops (>=992px)
  'lg', // HiDPI Desktops (>=1200px)
];
const SUFFIXES = [
  '', // no suffix for accessing xs, sm, md, and lg props
  'Offset', // an "Offset" suffix for accessing xsOffset, smOffset, mdOffset, and lgOffset props
  'Pull', // a "Pull" suffix for accessing xsPull, smPull, mdPull, and lgPull props
  'Push', // a "Push" Suffix for accessing xsPush, smPush, mdPush, and lgPush props
  'Hidden', // a "Hidden" Suffix for accessing xsHidden, smHidden, mdHidden, and lgHidden props
];

class Col extends React.Component {
  static get propTypes() {
    return {
      /**
       * If true, remove left and right padding
       */
      stripPadding: React.PropTypes.bool,
      /* eslint-disable react/no-unused-prop-types */
      /**
       * Span a number of columns on extra small devices
       * Phones (<768px)
       */
      xs: React.PropTypes.number,
      /**
       * Span a number of columns on small devices
       * Tablets (>=768px)
       */
      sm: React.PropTypes.number,
      /**
       * Span a number of columns on medium devices
       * MDPI Desktops (>=992px)
       */
      md: React.PropTypes.number,
      /**
       * Span a number of columns on large devices
       * HiDPI Desktops (>=1200px)
       */
      lg: React.PropTypes.number,
      /**
       * Hide column on extra small devices
       * Phones (<768px)
       */
      xsHidden: React.PropTypes.bool,
      /**
       * Hide column on small devices
       * Tablets (>=768px)
       */
      smHidden: React.PropTypes.bool,
      /**
       * Hide column on medium devices
       * MDPI Desktops (>=992px)
       */
      mdHidden: React.PropTypes.bool,
      /**
       * Hide column on large devices
       * HiDPI Desktops (>=1200px)
       */
      lgHidden: React.PropTypes.bool,
      /**
       * Move a number of columns to the right on extra small devices
       * Phones (<768px)
       */
      xsOffset: React.PropTypes.number,
      /**
       * Move a number of columns to the right on small devices
       * Tablets (>=768px)
       */
      smOffset: React.PropTypes.number,
      /**
       * Move a number of columns to the right on medium devices
       * MDPI Desktops (>=992px)
       */
      mdOffset: React.PropTypes.number,
      /**
       * Move a number of columns to the right on large devices
       * HiDPI Desktops (>=1200px)
       */
      lgOffset: React.PropTypes.number,
      /**
       * Change a number of columns order to the left on extra small devices
       * Phones (<768px)
       */
      xsPull: React.PropTypes.number,
      /**
       * Change a number of columns order to the left on small devices
       * Tablets (>=768px)
       */
      smPull: React.PropTypes.number,
      /**
       * Change a number of columns order to the left on medium devices
       * MDPI Desktops (>=992)
       */
      mdPull: React.PropTypes.number,
      /**
       * Change a number of columns order to the left on large devices
       * HiDPI Desktops (>=1200)
       */
      lgPull: React.PropTypes.number,
      /**
       * Change a number of columns order to the right on extra small devices
       * Phones (<768px)
       */
      xsPush: React.PropTypes.number,
      /**
       * Change a number of columns order to the right on small devices
       * Tablets (>=768px)
       */
      smPush: React.PropTypes.number,
      /**
       * Change a number of columns order to the right on medium devices
       * MDPI Desktops (>=992)
       */
      mdPush: React.PropTypes.number,
      /**
       * Change a number of columns order to the right on large devices
       * HiDPI Desktops (>=1200)
       */
      lgPush: React.PropTypes.number,
      /* eslint-enable react/no-unused-prop-types */
    };
  }

  render() {
    const classes = [];
    DEVICE_SIZES.forEach((size) => {
      SUFFIXES.forEach((suffix) => {
        switch (suffix) {
          /**
           * Hiding a content has different css class name format
           * Format: hidden-[device size]
           * e.g. hidden-xs, hidden-sm, hidden-md, and hidden-lg
           */
          case 'Hidden': {
            const value = this.props[`${size}${suffix}`];
            if (value) {
              classes.push(Bootstrap[`hidden-${size}`]);
            }
            break;
          }
          /**
           * Other css class formats (span, offset, pull, and push) has general pattern.
           * Format: col-[device size]-[suffix]-[column grid number]
           * e.g. col-xs, col-sm-offset, col-md-pull, and col-lg-push
           */
          default: {
            const value = this.props[`${size}${suffix}`];
            if (value > 0 && value <= 12) {
              const key = size + (suffix !== '' ? `-${suffix.toLowerCase()}` : '');
              classes.push(Bootstrap[['col', key, value].join('-')]);
            }
          }
        }
      });
    });
    const className = classNames(
      classes,
      { [styles.stripPadding]: this.props.stripPadding },
      this.props.className
    );

    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }
}

export default Col;
