import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Col from '../components/Col/Col';
import Container from '../components/Container/Container';
import Header from '../components/Header/Header';
import MapContainer from '../containers/MapContainer';
import Pushpin from '../components/Pushpin/Pushpin';
import Row from '../components/Row/Row';
import SearchFilterBarContainer from '../containers/SearchFilterBarContainer';
import SearchResultContainer from '../containers/SearchResultContainer';
import Sidebar from '../components/Sidebar/Sidebar';
import { searchRestaurants } from '../actions/search';
import { loadGoogleMapAPI } from '../helpers/googleMap';

class SearchPage extends React.Component {
  static get childContextTypes() {
    return {
      google: React.PropTypes.object,
    };
  }

  static get propTypes() {
    return {
      location: React.PropTypes.shape({
        query: React.PropTypes.objectOf(React.PropTypes.string),
      }),
      router: React.PropTypes.object,
      searchRestaurants: React.PropTypes.func,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      google: null,
    };
    this.initGoogleMapAPI = this.initGoogleMapAPI.bind(this);
    this.setHeaderNode = this.setHeaderNode.bind(this);
  }

  getChildContext() {
    return {
      google: this.state.google,
    };
  }

  componentDidMount() {
    loadGoogleMapAPI().then(this.initGoogleMapAPI);

    this.unlisten = this.props.router.listen((location) => {
      if (location.pathname !== '/search') return;

      const query = location.query;
      this.props.searchRestaurants(query.term, {
        name: query.location,
        coordinate: query.coordinate,
      }, {
        page: query.page,
        sort: query.sort,
      });
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  setHeaderNode(component) {
    if (component) this.headerNode = ReactDOM.findDOMNode(component);
  }

  initGoogleMapAPI(google) {
    this.setState({
      google,
    });
  }

  render() {
    const query = this.props.location.query;

    return (
      <div>
        <Header
          fluid
          query={query}
          ref={this.setHeaderNode}
          searchBar
        />
        <Container fluid>
          <Row>
            <Col stripPadding sm={12} md={6} lg={5}>
              <Sidebar>
                <Pushpin offset={this.headerNode && this.headerNode.offsetTop}>
                  <SearchFilterBarContainer query={query} />
                </Pushpin>
                <SearchResultContainer query={query} />
              </Sidebar>
            </Col>
            <Col stripPadding xsHidden smHidden md={6} lg={7}>
              {this.state.google && <MapContainer query={query} />}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(
  connect(null, { searchRestaurants })(SearchPage)
);
