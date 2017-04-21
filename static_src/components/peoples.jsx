import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CircularProgress from 'material-ui/CircularProgress';
import { loadUsers, loadUsersSuccess, loadUsersFail, fetchPeople } from '../actions/people';

class PeoplesComponent extends Component {

  componentDidMount() {
    this.props.fetchPeople(this.url);
  }

  url = '';

  render() {
    // console.log("PeoplesComponent render");
    let listProps;
    this.url = '/api/users/';
    listProps = this.props.usersList;

    return (
      <div> { this.props.isLoading ?
        <CircularProgress size={60} thickness={7} /> : listProps
      }
      </div>
    );
  }
}

PeoplesComponent.propTypes = {
  // type: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.people.isLoading,
  usersList: state.people.usersList,
});

const mapDispatchToProps = distpatch => ({
  ...bindActionCreators({
    loadUsers,
    loadUsersSuccess,
    loadUsersFail,
    fetchPeople,
  }, distpatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PeoplesComponent);
