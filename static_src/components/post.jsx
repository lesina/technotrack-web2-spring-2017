import React, { Component } from 'react';
import { Panel, Row } from 'react-bootstrap';
import Avatar from 'material-ui/Avatar';

class PostComponent extends Component {
  state = {
    author: '',
    user: {
      pk: 0,
      username: '',
      first_name: '',
      last_name: '',
      avatar: null,
    },
    date: '',
    content_object: '',
    title: '',
  }

  render() {
    return <div></div>;
  }
}

PostComponent.propTypes = {
  author: React.propTypes.string.isRequired,
  user: React.PropTypes.shape({
    pk: React.propTypes.number,
    username: React.PropTypes.string,
    avatar: React.PropTypes.string,
    first_name: React.PropTypes.string,
    last_name: React.PropTypes.string,
  }).isRequired,
  date: React.PropTypes.string.isRequired,
  content_object: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
};

export default PostComponent;
