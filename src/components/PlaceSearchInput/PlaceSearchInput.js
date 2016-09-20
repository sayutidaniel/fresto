import React from 'react';
import ReactDOM from 'react-dom';
import Input from '../Input/Input';

class SearchBox extends React.Component {
  static get contextTypes() {
    return {
      /**
       * Loaded google map library
       */
      google: React.PropTypes.object,
    };
  }

  static get propTypes() {
    return {
      /**
       * Callback fired when google place auto complete item is selected
       */
      onSearch: React.PropTypes.func,
    };
  }

  constructor(props) {
    super(props);
    this.setAutoCompleteInputNode = this.setAutoCompleteInputNode.bind(this);
    this.initAutoComplete = this.initAutoComplete.bind(this);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.context.google === null && this.context.google !== nextContext.google) {
      // pass google context to initialize google auto complete
      this.initAutoComplete(nextContext.google);
    }
  }


  /**
   * Store a reference of auto complete input DOM element
   *
   * @param {ReactElement} component
   */
  setAutoCompleteInputNode(component) {
    if (component) this.autoCompleteInputNode = ReactDOM.findDOMNode(component);
  }

  /**
   * Initialize google place auto complete input
   *
   * @param google
   */
  initAutoComplete(google) {
    const autoComplete = new google.maps.places.Autocomplete(this.autoCompleteInputNode);
    autoComplete.addListener('place_changed', () => {
      const place = autoComplete.getPlace();
      const coordinate = place.geometry.location;

      this.props.onSearch({
        coordinate: `${coordinate.lat()},${coordinate.lng()}`,
        name: place.formatted_address,
      });
    });
  }

  render() {
    const props = Object.assign({}, this.props);
    delete props.onSearch;

    return (
      <Input
        placeholder="Near a location"
        ref={this.setAutoCompleteInputNode}
        type="text"
        {...props}
      />
    );
  }
}

export default SearchBox;
