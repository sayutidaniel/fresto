import classNames from 'classnames';
import React from 'react';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

class Tooltip extends React.Component {
  static get propTypes() {
    return {
      /**
       * Set direction the `Tooltip` is positioned towards
       */
      placement: React.PropTypes.oneOf([
        'bottom',
        'left',
        'right',
        'up',
      ]).isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  render() {
    return (
      <div className={classNames(Bootstrap.tooltip, Bootstrap[this.props.placement])}>
        <div className={Bootstrap['tooltip-arrow']} />
        <div className={Bootstrap['tooltip-inner']}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Tooltip;
