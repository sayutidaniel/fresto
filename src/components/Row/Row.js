import React from 'react';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

class Row extends React.Component {
  render() {
    return (
      <div className={Bootstrap.row}>
        {this.props.children}
      </div>
    );
  }
}

export default Row;
