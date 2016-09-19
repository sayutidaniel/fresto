import React from 'react';
import ReactDOM from 'react-dom';
import Style from './Pushpin.css';

class Pushpin extends React.Component {
  static get propTypes() {
    return {
      bottom: React.PropTypes.number,
      children: React.PropTypes.element.isRequired,
      offset: React.PropTypes.number,
      top: React.PropTypes.number
    };
  }

  static get defaultProps() {
    return {
      bottom: Infinity,
      offset: 0,
      top: null
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      pinned: false
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.setChildNode = this.setChildNode.bind(this);
  }

  componentDidMount() {
    const parentNode = this.childNode.parentNode;
    parentNode.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    const parentNode = this.childNode.parentNode;
    parentNode.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const childRect = this.childNode.getBoundingClientRect();
    const parentNode = this.childNode.parentNode;
    const parentRect = parentNode.getBoundingClientRect();
    const top = (this.props.top === null ? parentRect.top : this.props.top) - this.props.offset;
    const bottom = this.props.bottom - this.props.offset - childRect.height;
    const scroll = parentNode.scrollTop;

    this.setState({ pinned: scroll > top && scroll <= bottom });
  };

  setChildNode(component) {
    if (component) this.childNode = ReactDOM.findDOMNode(component);
  };

  render() {
    const {
      children,
      offset,
    } = this.props;
    const child = React.Children.only(children);

    if (this.state.pinned) {
      const { height, width } = this.childNode.getBoundingClientRect();

      return (
        <div ref={this.setChildNode}>
          <div className={Style.placeholder} style={{ height, width }} />
          <div className={Style.pinned} style={{ top: offset, width }}>{child}</div>
        </div>
      );
    }
    return React.cloneElement(child, { ref: this.setChildNode });
  }
}

export default Pushpin;
