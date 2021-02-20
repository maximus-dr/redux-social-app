import React from 'react';
import { useDispatch } from 'react-redux';
import { addReaction } from './postsSlice';

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

    const count = post.reactions[name];

    return (
      <button 
        key={name} 
        type="button" 
        className="muted-button reaction-button"
        onClick={() => dispath(addReaction({
          reaction: name,
          post,
          count
        }))}  
      >
        {emoji} {count}
      </button>
    );
  })

  return (
    <div>
      {ReactionButtons}
    </div>
  )
}
