import React, { Component } from 'react';
import PeoplesComponent from './peoples';
import PeopleSearchComponent from './peopleSearch';

export default class PeopleListLayout extends Component {
  render() {
          // console.log("Entering PeoplesComponent");
    return (
      <div>
        <PeopleSearchComponent url={'/accounts/users/'} />
        <PeoplesComponent />
      </div>
    );
  }
}
