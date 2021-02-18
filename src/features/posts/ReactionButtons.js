import React from 'react';
import { useDispatch } from 'react-redux';
import { reactionAdded } from './postsSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
};

export default function ReactionButtons({ post }) {

  const dispath = useDispatch();

  const ReactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button 
        key={name} 
        type="button" 
        className="muted-button reaction-button"
        onClick={() => dispath(reactionAdded({
          postId: post.id,
          reaction: name
        }))}  
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  })

  return (
    <div>
      {ReactionButtons}
    </div>
  )
}
