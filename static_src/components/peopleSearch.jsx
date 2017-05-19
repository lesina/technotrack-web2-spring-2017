import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadUsers, loadUsersSuccess, loadUsersFail, fetchPeople } from '../actions/people';


class PeopleSearchComponent extends Component {
    state = {
    text: '',
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onCreate = (e) => {
    e.preventDefault();
    this.setState({ text: '' });
    this.props.fetchPeople(this.props.url + '?query=' + this.state.text);
    // console.log(this.props);
}

    render() {
        return (
            <div className="b-post">
        <div>
        <input
          placeholder="Поиск"
          className="area"
          value={ this.state.content }
          onChange={ this.onChange }
          name="text"></input>
      </div>
        <div className="button_field">
          <button onClick={ this.onCreate.bind(this) }>Найти</button>
      </div>
</div>
        );
    }
}

PeopleSearchComponent.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => ({
  user: state.users[props.id],
});

const mapDispatchToProps = distpatch => ({
  ...bindActionCreators({loadUsers, loadUsersSuccess, loadUsersFail, fetchPeople}, distpatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PeopleSearchComponent);