import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Container from '../components/Container/Container';
import Col from '../components/Col/Col';
import Row from '../components/Row/Row';
import Header from '../components/Header/Header';
import { findRestaurant } from '../actions/restaurant';
import RestaurantInfoContainer from '../containers/RestaurantInfoContainer';
import ReviewListContainer from '../containers/ReviewListContainer';
import { loadGoogleMapAPI } from '../helpers/googleMap';

class RestaurantPage extends React.Component {
  static get childContextTypes() {
    return {
      google: React.PropTypes.object,
    };
  }

  static get propTypes() {
    return {
      findRestaurant: React.PropTypes.func,
      location: React.PropTypes.shape({
        query: React.PropTypes.objectOf(React.PropTypes.string),
      }),
      router: React.PropTypes.object,
      params: React.PropTypes.objectOf(React.PropTypes.string),
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      google: null,
    };
    this.initGoogleMapAPI = this.initGoogleMapAPI.bind(this);
  }

  getChildContext() {
    return {
      google: this.state.google,
    };
  }

  componentDidMount() {
    loadGoogleMapAPI().then(this.initGoogleMapAPI);

    this.unlisten = this.props.router.listen((location) => {
      if (location.pathname.indexOf('/restaurant') !== 0) return;

      this.props.findRestaurant(this.props.params.id);
    });
  }

  initGoogleMapAPI(google) {
    this.setState({
      google,
    });
  }

  render() {
    return (
      <div>
        <Header
          query={this.props.location.query}
          searchBar
        />
        <Container>
          <Row>
            <Col>
              <RestaurantInfoContainer />
              <ReviewListContainer />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(
  connect(null, { findRestaurant })(RestaurantPage)
);
