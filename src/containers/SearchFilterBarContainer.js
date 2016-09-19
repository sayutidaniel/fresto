import React from 'react';
import { withRouter } from 'react-router';
import SearchFilterBar from '../components/SearchFilterBar/SearchFilterBar';

class SearchFilterBarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange({ sort }) {
    this.props.router.push({
      pathname: '/search',
      query: Object.assign({}, this.props.query, {
        sort,
      })
    });
  }

  render() {
    const query = this.props.query;
    
    return (
      <SearchFilterBar
        sort={query && parseInt(query.sort, 10)}
        onFilterChange={this.handleFilterChange}
      />
    );
  }
}

export default withRouter(SearchFilterBarContainer);
