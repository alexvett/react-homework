import React, { useState } from 'react';
import './PostCard.css'; 

const PostCard = ({ title, text, currentLikes }) => {
  const [likes, setLikes] = useState(currentLikes);
  
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className={`post-card ${isLiked ? 'liked' : ''}`}>
      <h3>{title}</h3>
      <p>{text}</p>
      <div className="card-footer">
        <span className="likes-count">Лайки: {likes}</span>
        <button onClick={handleLikeClick} className="like-button">
          {isLiked ? 'Отменить лайк' : 'Поставить лайк'}
        </button>
      </div>
    </div>
  );
};

export default PostCard;