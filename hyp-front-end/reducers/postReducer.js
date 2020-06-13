import { FETCH_POSTS, NEW_POST } from '../actions/types'

const initialState = {
  items: [],
  item: {}
}

export default (state = initialState, action) => {
  console.log("inside postReducer");
  // console.log('action type: ', action ? action.type : "");
  // console.log('action payload: ', action ? action.payload : "");


  switch (action.type) {
    case FETCH_POSTS:
      console.log('hit fetch posts switch condition');
      return {
        ...state,
        items: action.payload
      }
    case NEW_POST:
      console.log('hit new post switch condition', action.payload, action.type);
      return {
        ...state,
        item: action.payload
      }

    default:
      console.log('hit default case');

      // return state
      return {
        ...state
      }
  }
}