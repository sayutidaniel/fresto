import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Container from '../components/Container/Container';
import Overlay from '../components/Overlay/Overlay';
import Row from '../components/Row/Row';
import SearchResult from '../components/SearchResult/SearchResult';

class SearchResultContainer extends React.Component {
  static get propTypes() {
    return {
      isFetching: React.PropTypes.bool,
      items: React.PropTypes.array,
      query: React.PropTypes.objectOf(React.PropTypes.string),
      router: React.PropTypes.object,
      total: React.PropTypes.number,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      page: parseInt(props.query.page, 10) || 1,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(page) {
    this.setState({ page }, () => {
      this.props.router.push({
        pathname: '/search',
        query: Object.assign({}, this.props.query, {
          page,
        }),
      });
    });
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <SearchResult
            items={this.props.items}
            page={this.state.page}
            total={this.props.total}
            onPageChange={this.handlePageChange}
          />
          <Overlay hidden={!this.props.isFetching} />
        </Row>
      </Container>
    );
  }
}

export default withRouter(connect(state => ({
  isFetching: state.search.isFetching,
  items: state.search.items,
  total: state.search.total,
}))(SearchResultContainer));
