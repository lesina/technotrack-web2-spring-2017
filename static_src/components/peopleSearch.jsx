import React, { Component } from 'react';
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import PeoplesComponent from './peoples';

export default class PeopleListLayout extends Component {
  render() {
          // console.log("Entering PeoplesComponent");
    return (
      <div>
      <FormGroup>
        <InputGroup>
          <FormControl type="text" />
          <InputGroup.Button>
            <Button>Найти</Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
        <PeoplesComponent />
        </div>
    );
  }
}
