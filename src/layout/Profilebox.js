import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ListDividers() {
  const classes = useStyles();

  return (
    <div className="posts-container">
      <div className="posts">
        <div class="posts-item">
          <div className="create-posts-letterbox">
            <div className="create-post-text">Create Post</div>
          </div>
          <div className="create-post-call-to-action">
            <div className="posts-page-circle">
            </div>
            <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu vestibulum diam. Nunc eu quam vitae velit mollis facilisis. Praesent ac tristique dui.            </div>
          </div>
          <div className="create-posts-letterbox create-post-button-container">
            <button>Like </button>
            <button>Comment </button>
            <button>Share</button>
          </div>
        </div>
      </div>
    </div>

    
  );
}
