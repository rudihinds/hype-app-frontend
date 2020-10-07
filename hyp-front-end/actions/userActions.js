import {
  HANDLE_LOGGED_USER,
  HANDLE_SHOW_FOLLOWERS,
  HANDLE_SHOW_FOLLOWED,
  HANDLE_FOLLOW_ACTION,
  HANDLE_UNFOLLOW_ACTION,
  HANDLE_USER_SEARCH,
  HANDLE_USER_SEARCH_INPUT,
} from "../actions/types";

export const saveUser = (user) => {
  return {
    type: HANDLE_LOGGED_USER,
    payload: user,
  };
};

export const showFollowers = () => {
  return {
    type: HANDLE_SHOW_FOLLOWERS,
  };
};

export const showFollowed = () => {
  return {
    type: HANDLE_SHOW_FOLLOWED,
  };
};

export const addFollowers = (user) => {
  return {
    type: HANDLE_FOLLOW_ACTION,
    payload: user,
  };
};

export const unFollow = (user) => {
  return {
    type: HANDLE_UNFOLLOW_ACTION,
    payload: user,
  };
};

export const follow = (user) => {
  return {
    type: HANDLE_FOLLOW_ACTION,
    payload: user,
  };
};

export const searchedUsers = (searchedUsers) => {
  return {
    type: HANDLE_USER_SEARCH,
    payload: searchedUsers,
  };
};

export const searchUsershandler = (input) => {
  return {
    type: HANDLE_USER_SEARCH_INPUT,
    payload: input,
  };
};
