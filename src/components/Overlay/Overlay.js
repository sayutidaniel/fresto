import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './Overlay.css';

class Overlay extends React.Component {
  static propTypes() {
    return {
      hidden: React.PropTypes.bool,
    };
  }

  static get defaultProps() {
    return {
      hidden: true,
    };
  };

  render() {
    const transitionProps = {
      component: 'div',
      transitionName: {
        enter: styles.enter,
        enterActive: styles.enterActive,
        leave: styles.leave,
        leaveActive: styles.leaveActive,
      },
      transitionEnterTimeout: 300,
      transitionLeaveTimeout: 200,
    };

    return (
      <ReactCSSTransitionGroup {...transitionProps}>
        {!this.props.hidden && <div className={styles.overlay} />}
      </ReactCSSTransitionGroup>
    );
  }
}

export default Overlay;
