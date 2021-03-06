/* global document: true */
/* global window: true */
import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import '../styles/bootstrap-3/css/bootstrap.css';
import NavbarTop from './navbarTop';
import NavbarLeft from './navbarLeft';
import PostListLayoutComponent from './postListLayout';
import FriendListLayout from './friendList';
import UserPage from './userPage';
import ChatsListComponent from './chatsList';
import PeopleListLayout from './peopleListLayout';
import { setProfile } from '../actions/account';
import { history } from '../store';

class LayoutComponent extends Component {
  componentDidMount() {
    fetch('http://localhost:8080/api/users/?format=json',
      {
        method: 'GET',
        credentials: 'same-origin',
      })
        .then(promise => promise.json())
        .then((json) => {
          this.props.setProfile(json[0]);
        });
  }

  onCreate = (post) => {
    this.setState({
      postList: [post, ...this.state.postList],
    });
  };

  render() {
    let page = null;
    const News = <PostListLayoutComponent />;
    switch (this.props.currentPage) {
      case 'news': page = <PostListLayoutComponent />;
        break;
      case 'mypage': page = <UserPage id={this.props.profile.id} />;
        break;
      case 'friends': page = <FriendListLayout />;
        break;
      case 'chats': page = <ChatsListComponent />;
        break;
      case 'people': page = <PeopleListLayout />;
        break;
      default:
        page = <PostListLayoutComponent />;
    }

    return (
      <div>
        <NavbarTop user={this.props.profile} />
        <Grid fluid>
          <NavbarLeft onSelect={this.onMenuSelect} />
          <Col xs={12} md={8}>
            { page }
          </Col>
        </Grid>
      </div>
    );
  }
}

// LayoutComponent.propTypes = {
//   onSelect: PropTypes.func.isRequired,
// };

const mapStateToProps = state => ({
  currentPage: state.router.currentPage,
  profile: state.layout.account,
});

const mapDispatchToProps = distpatch => ({
  ...bindActionCreators({
    setProfile,
  }, distpatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LayoutComponent);
