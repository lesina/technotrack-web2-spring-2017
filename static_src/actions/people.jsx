export const LOAD_USERS = 'LOAD_USERS';
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const LOAD_USERS_FAIL = 'LOAD_USERS_FAIL';

export function loadUsers() {
  return {
    type: LOAD_USERS,
  };
}

export function loadUsersSuccess(users) {
  return {
    type: LOAD_USERS_SUCCESS,
    users,
  };
}

export function loadUsersFail() {
  return {
    type: LOAD_USERS_FAIL,
  };
}

export function fetchPeople(url) {
  return function (dispatch) {
    dispatch(loadUsers());
    // console.log(this.props.isLoading);
    fetch(url,
      {
        method: 'GET',
        credentials: 'same-origin',
      })
      .then(promise => promise.json())
      .then((json) => {
        console.log(json);
        dispatch(loadUsersSuccess(json));
      });
  };
}
