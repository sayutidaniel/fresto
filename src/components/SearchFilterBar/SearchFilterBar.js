import classNames from 'classnames';
import React from 'react';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import Container from '../Container/Container';
import Col from '../Col/Col';
import Row from '../Row/Row';
import Select from '../Select/Select';
import styles from './SearchFilterBar.css';

class SearchFilterBar extends React.Component {
  static get propTypes() {
    return {
      sort: React.PropTypes.number,
      onFilterChange: React.PropTypes.func,
    };
  }

  static get defaultProps() {
    return {
      sort: 0,
    };
  }

  constructor(props) {
    super(props);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange(event) {
    this.props.onFilterChange && this.props.onFilterChange({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <Container className={styles.container} fluid stripPadding>
        <Row>
          <Col xs={12}>
            <div className={Bootstrap['form-horizontal']}>
              <div className={classNames(styles.formGroup, Bootstrap['form-group'], Bootstrap['form-group-sm'])}>
                <Col sm={3}><label className={Bootstrap['control-label']}>Sort</label></Col>
                <Col sm={9}>
                  <Select
                    className={Bootstrap['input-sm']}
                    defaultValue={this.props.sort}
                    name="sort"
                    onChange={this.handleFilterChange}
                  >
                    <option value={2}>Top Rated</option>
                    <option value={1}>Nearest</option>
                    <option value={0}>Most Relevant</option>
                  </Select>
                </Col>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SearchFilterBar;
