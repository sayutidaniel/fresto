import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import Container from '../Container/Container';
import SearchBarContainer from '../../containers/SearchBarContainer';
import styles from './Header.css';

class Header extends React.Component {
  static get propTypes() {
    return {
      /**
       * If true, it will span the entire width of viewport
       */
      fluid: React.PropTypes.bool,
      /**
       * A query string to pass in coordinate, term, and location to `SearchBarContainer` component
       * This is required, if `searchBar` is true
       */
      query: React.PropTypes.objectOf(React.PropTypes.string),
      /**
       * If true, display `SearchBarContainer` component
       */
      searchBar: React.PropTypes.bool,
    };
  }

  static get defaultProps() {
    return {
      /**
       * Set default to fixed width
       */
      fluid: false,
      /**
       * Set default to not display search bar component
       */
      searchBar: false,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      /**
       * An indicator of collapsed/expanded navbar in mobile view
       */
      collapse: false,
    };
    this.handleClickBurger = this.handleClickBurger.bind(this);
  }

  /**
   * Handler of burger button click event to toggle navbar in mobile view
   */
  handleClickBurger() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <header>
        <nav className={classNames(styles.nav, Bootstrap.navbar, Bootstrap['navbar-fixed-top'])}>
          <Container fluid={this.props.fluid}>
            <div className={Bootstrap['navbar-header']}>
              <button type="button" className={classNames(Bootstrap['navbar-toggle'], Bootstrap.collapsed)} onClick={this.handleClickBurger}>
                <span className={Bootstrap['sr-only']}>Toggle navigation</span>
                <span className={classNames(styles.iconBar, Bootstrap['icon-bar'])} />
                <span className={classNames(styles.iconBar, Bootstrap['icon-bar'])} />
                <span className={classNames(styles.iconBar, Bootstrap['icon-bar'])} />
              </button>
              <Link className={classNames(styles.brand, Bootstrap['navbar-brand'])} to="/">Fresto</Link>
            </div>

            <div className={classNames(styles.navbar, Bootstrap.collapse, Bootstrap['navbar-collapse'], { [Bootstrap.in]: this.state.collapse })}>
              {this.props.searchBar && (
                <ul className={classNames(Bootstrap.nav, Bootstrap['navbar-nav'], Bootstrap['navbar-left'])}>
                  <li>
                    <Container className={styles.searchBarContainer} fluid>
                      <SearchBarContainer query={this.props.query} />
                    </Container>
                  </li>
                </ul>
              )}
              <ul className={classNames(Bootstrap.nav, Bootstrap['navbar-nav'], Bootstrap['navbar-right'])}>
                <li><Link>Log In</Link></li>
                <li><Link>Sign Up</Link></li>
              </ul>
            </div>
          </Container>
        </nav>
      </header>
    );
  }
}

export default Header;
