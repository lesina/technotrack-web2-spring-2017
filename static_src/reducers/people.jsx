import update from 'react-addons-update';
import React from 'react';
import { LOAD_USERS, LOAD_USERS_SUCCESS, LOAD_USERS_FAIL } from '../actions/people';
import PeopleComponent from '../components/people';

const initialState = {
  isLoading: false,
  usersList: [],
};

export default function people(store = initialState, action) {
  switch (action.type) {
    case LOAD_USERS:
      return update(store, { isLoading: { $set: true } });
    case LOAD_USERS_SUCCESS:
    // action.users.map( user => console.log(user));
      const users = action.users.map(
            user => (<PeopleComponent key={user} id={user} />),
          );
      // console.log(users);
      let bufStore;
      bufStore = update(store, { usersList: { $merge: users } });
      // console.log(bufStore);
      return update(bufStore, {
        isLoading: { $set: false },
      });
    case LOAD_USERS_FAIL:
      return update(store, { isLoading: { $set: false } });
    default:
      return store;
  }
}
