import { combineReducers } from 'redux';
import router from './router';
import layout from './layout';
import posts from './posts';
import users from './users';
import friendship from './friendship';
import people from './people'

export default combineReducers({
  router,
  layout,
  posts,
  users,
  friendship,
  people,
});
