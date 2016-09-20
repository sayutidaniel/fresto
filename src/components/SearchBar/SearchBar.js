import classNames from 'classnames';
import React from 'react';
import Bootstrap from '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import Input from '../Input/Input';
import PlaceSearchInput from '../PlaceSearchInput/PlaceSearchInput';
import styles from './SearchBar.css';

class SearchBar extends React.Component {
  static get propTypes() {
    return {
      /**
       * Current location name to be displayed in input element
       */
      location: React.PropTypes.string,
      /**
       * Current search term to be displayed in input element
       */
      term: React.PropTypes.string,
      /**
       * Callback fired when search button is clicked
       */
      onSearch: React.PropTypes.func,
    };
  }

  static get defaultProps() {
    return {
      location: '',
      term: '',
    };
  }

  constructor(props) {
    super();
    this.state = {
      /**
       * Store selected location, used to pass into `onSearch` callback as parameter
       */
      location: {
        name: props.location,
        coordinate: null,
      },
      /**
       * Controlled search term input value
       */
      term: props.term,
    };
    this.handleChangeTerm = this.handleChangeTerm.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchPlace = this.handleSearchPlace.bind(this);
  }

  /**
   * Handler to update search term input value
   *
   * @param {Event} event
   */
  handleChangeTerm(event) {
    this.setState({ term: event.target.value });
  }

  /**
   * Handler to store selected location
   *
   * @param location
   */
  handleSearchPlace(location) {
    this.setState({ location });
  }

  /**
   * Handler for search button click event, it will fire `onSearch` callback
   */
  handleSearch() {
    const { term, location } = this.state;
    this.props.onSearch && this.props.onSearch(term, location);
  }

  render() {
    return (
      <div className={Bootstrap['form-inline']}>
        <div className={Bootstrap['form-group']}>
          <Input
            placeholder="Find local restaurants"
            type="text"
            value={this.state.term}
            onChange={this.handleChangeTerm}
          />
        </div>
        {' '}
        <div className={Bootstrap['form-group']}>
          <PlaceSearchInput defaultValue={this.props.location} onSearch={this.handleSearchPlace} />
        </div>
        {' '}
        <button
          className={classNames(styles.buttonSearch, Bootstrap.btn, Bootstrap['btn-default'])}
          type="button"
          onClick={this.handleSearch}
        >
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
