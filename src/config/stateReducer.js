export default (state, action) => {
  switch (action.type) {
    case 'setPosts': {
      return { ...state, posts: action.data };
    }
    case 'addPost': {
      return { ...state, posts: action.data };
    }
    case 'deletePost': {
      return { ...state, posts: action.data };
    }
    case 'editPost': {
      return { ...state, posts: action.data };
    }
    case 'getUserID': {
      return { ...state, userID: action.data };
    }

    default:
      return state;
  }
};
