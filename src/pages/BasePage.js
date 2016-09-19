import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './global.css';

class BasePage extends React.Component {
  render() {
    return this.props.children;
  }
}

export default BasePage;
