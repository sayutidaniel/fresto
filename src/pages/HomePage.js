import React from 'react';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import Container from '../components/Container/Container';
import Header from '../components/Header/Header';
import SearchBarContainer from '../containers/SearchBarContainer';
import { loadGoogleMapAPI } from '../helpers/googleMap';

class HomePage extends React.Component {
  static get childContextTypes() {
    return {
      google: React.PropTypes.object,
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
  }

  initGoogleMapAPI(google) {
    this.setState({
      google,
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div className={Bootstrap.jumbotron}>
          <Container>
            <h1>LIVE TO EAT</h1>
            <p>
              "One cannot think well, love well, sleep well, if one has not dined well."<br />
              <em><small>― Virginia Woolf, A Room of One's Own</small></em>
            </p>
            <SearchBarContainer />
          </Container>
        </div>
      </div>
    );
  }
}

export default HomePage;
