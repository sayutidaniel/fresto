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
      fluid: React.PropTypes.bool,
      searchBar: React.PropTypes.bool,
    };
  }

  static get  defaultProps() {
    return {
      fluid: false,
      searchBar: false,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
    };
    this.handleClickBurger = this.handleClickBurger.bind(this);
  }

  handleClickBurger() {
    this.setState({ collapse: !this.state.collapse });
  };

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

            <div className={classNames(styles.navbar, Bootstrap.collapse, Bootstrap['navbar-collapse'], {[Bootstrap.in]: this.state.collapse})}>
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
