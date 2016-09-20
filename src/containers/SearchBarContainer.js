import React from 'react';
import { withRouter } from 'react-router';
import SearchBar from '../components/SearchBar/SearchBar';

class SearchBarContainer extends React.Component {
  static get propTypes() {
    return {
      query: React.PropTypes.objectOf(React.PropTypes.string),
      router: React.PropTypes.object,
    };
  }

  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(term, location) {
    const query = Object.assign({}, this.props.query, {
      coordinate: location.coordinate,
      location: location.name,
      term,
    });

    this.props.router.push({
      pathname: '/search',
      query,
    });
  }

  render() {
    const query = this.props.query;

    return (
      <SearchBar
        location={query && query.location}
        term={query && query.term}
        onSearch={this.handleSearch}
      />
    );
  }
}

export default withRouter(SearchBarContainer);
