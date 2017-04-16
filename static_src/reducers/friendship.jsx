import update from 'react-addons-update';
import React from 'react';
import { LOAD_FRIENDS, LOAD_FRIENDS_SUCCESS, LOAD_FRIENDS_FAIL } from '../actions/friendship';
import FriendComponent, { FRIENDSHIPS, FRIENDSHIP_REQUESTS, FRIENDSHIP_WAITINGS } from '../components/friend';

const initialState = {
  isLoading: false,
  friendsList: [],
  friendshipRequestList: [],
  friendshipWaitList: [],
};

export default function friendship(store = initialState, action) {
  switch (action.type) {
    case LOAD_FRIENDS:
      return update(store, { isLoading: { $set: true } });
    case LOAD_FRIENDS_SUCCESS:
    // console.log(action.friends);
    // action.friends.map( friend => console.log(friend));
      const friends = action.friends.map(
            friend => (<FriendComponent key={friend} id={friend} type={action.friendshipType} />),
          );
      // console.log(friends);
      let bufStore = store;
      switch (action.friendshipType) {
        case FRIENDSHIPS:
          if (action.friends.length > 0) {
            bufStore = update(store, { friendsList: { $merge: friends } });
          }
          break;
        case FRIENDSHIP_REQUESTS:
          bufStore = update(store, { friendshipRequestList: { $merge: friends } });
          break;
        case FRIENDSHIP_WAITINGS:
          bufStore = update(store, { friendshipWaitList: { $merge: friends } });
          break;
        default:
          bufStore = update(store, { friendsList: { $merge: friends } });
      }
      // console.log(bufStore);
      return update(bufStore, {
        isLoading: { $set: false },
      });
    case LOAD_FRIENDS_FAIL:
      return update(store, { isLoading: { $set: false } });
    default:
      return store;
  }
}
