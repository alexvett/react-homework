import React, { useState } from 'react';
import './PostCard.css'; 

const PostCard = ({ title, text, currentLikes, comments }) => {
  const [likes, setLikes] = useState(currentLikes);
  const [isLiked, setIsLiked] = useState(false);

  const [showComments, setShowComments] = useState(false);

  const handleLikeClick = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleToggleComments = () => {
    setShowComments(!showComments); 
  };

  return (
    <div className={`post-card ${isLiked ? 'liked' : ''}`}>
      <h3>{title}</h3>
      <p>{text}</p>
      
      <div className="card-footer">
        <span className="likes-count">Лайки: {likes}</span>
        <span className="comments-count">
          Комментарии: {comments.length}
        </span>
      </div>

      <div className="card-actions">
        <button onClick={handleLikeClick} className="like-button">
          {isLiked ? 'Отменить лайк' : 'Поставить лайк'}
        </button>
        <button onClick={handleToggleComments} className="comments-button">
          {showComments ? 'Скрыть комментарии' : 'Открыть комментарии'}
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <h4>Комментарии:</h4>
          {comments.length > 0 ? (
            <ul>
              {comments.map(comment => (
                <li key={comment.id}>
                  <strong>{comment.author}:</strong> {comment.text}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-comments">Нет комментариев.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;