import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './Overlay.css';

/**
 * Current usage of this component is to indicate search result loading state
 */
class Overlay extends React.Component {
  static propTypes() {
    return {
      /**
       * If true, hide this component
       */
      hidden: React.PropTypes.bool,
    };
  }

  static get defaultProps() {
    return {
      /**
       * Set default to be hidden
       */
      hidden: true,
    };
  }

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
