import React, { Component } from 'react';
import { Media, Button, ButtonToolbar, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

class PeopleComponent extends Component {
  render() {
    // console.log(this.props);
    let bsStyle;
    let BUTTONS;
    bsStyle = '';
    BUTTONS = (
      <ButtonToolbar>
        <Button bsStyle="primary">Написать</Button>
        <Button bsStyle="link">Смотреть страницу</Button>
      </ButtonToolbar>
    );

    return (
      <ListGroupItem bsStyle={bsStyle}>
        <Media>
          <Media.Left>
            <img width={64} height={64} src={this.props.user.avatar} alt="User's avatar" />
          </Media.Left>
          <Media.Body>
            <Media.Heading>{this.props.user.username}</Media.Heading>
            <p>{this.props.user.first_name} {this.props.user.last_name}</p>
            { BUTTONS }
          </Media.Body>
        </Media>
      </ListGroupItem>
    );
  }
}

PeopleComponent.propTypes = {
  id: PropTypes.number.isRequired,
  // type: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => ({
  user: state.users[props.id],
});

const mapDispatchToProps = distpatch => ({
  ...bindActionCreators({
  }, distpatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PeopleComponent);
