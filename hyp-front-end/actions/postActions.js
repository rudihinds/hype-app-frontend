import { FETCH_POSTS, NEW_POST } from './types'
console.log('fetch posts in post ACTIONS: ', FETCH_POSTS);

export const fetchPosts = () => dispatch => {
  console.log('running fetxh podsts in posdt Actions');

  fetch('http://localhost:3000/posts')
    .then(res => res.json())
    .then(data => dispatch({ type: FETCH_POSTS, payload: data }))
}

export const createPost = post => dispatch => {
  console.log('action called, post is:', post);
  fetch('http://localhost:3000/posts', {
    method: 'POST',
    body: JSON.stringify(post),
    headers: { 'Content-type': "Application/json" }
  }).then(res => res.json()).then(data => dispatch({ type: NEW_POST, payload: data }))

  // .then(post => dispatch({
  //   type: NEW_POST,
  //   payload: post
  // }))
}


