import React from 'react';
import styles from './Sidebar.css';

class Sidebar extends React.Component {
  render() {
    return (
      <div className={styles.sidebar}>
        {this.props.children}
      </div>
    );
  }
}

export default Sidebar;
