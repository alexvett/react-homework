import React, { useState } from 'react';
import classNames from 'classnames'; 
import styles from './PostCard.module.scss'; 

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

    const cardClasses = classNames(
        styles.postCard, 
        { [styles.liked]: isLiked } 
    );

    return (
        <div className={cardClasses}>
            <h3>{title}</h3>
            <p>{text}</p>
            
            <div className={styles.cardFooter}>
                <span className={styles.likesCount}>Лайки: {likes}</span>
                <span className={styles.commentsCount}>
                    Комментарии: {comments.length}
                </span>
            </div>

            <div className={styles.cardActions}>
                <button 
                    onClick={handleLikeClick} 
                    className={styles.likeButton}
                >
                    {isLiked ? 'Отменить лайк' : 'Поставить лайк'}
                </button>
                <button 
                    onClick={handleToggleComments} 
                    className={styles.commentsButton}
                >
                    {showComments ? 'Скрыть комментарии' : 'Открыть комментарии'}
                </button>
            </div>

            {showComments && (
                <div className={styles.commentsSection}>
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
                        <p className={styles.noComments}>Нет комментариев.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default PostCard;