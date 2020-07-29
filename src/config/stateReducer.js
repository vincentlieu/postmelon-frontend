export default (state, action) => {
  switch (action.type) {
    case "setPosts": {
      return { ...state, posts: action.data };
    }
    case "addPost": {
      return { ...state, posts: action.data };
    }
    case "deletePost": {
      return { ...state, posts: action.data };
    }
    case "editPost": {
      return { ...state, posts: action.data };
    }
    case "likePost": {
      return { ...state, posts: action.data };
    }
    case "addComment": {
      return { ...state, posts: action.data };
    }
    case "deleteComment": {
      return { ...state, posts: action.data };
    }
    case "editComment": {
      return { ...state, posts: action.data };
    }
    case "getUserID": {
      return { ...state, userID: action.data };
    }
    case "setToken": {
      return { ...state, token: action.data };
    }

    default:
      return state;
  }
};
