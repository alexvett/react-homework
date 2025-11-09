import React, { useState } from 'react';
import styles from './CommentList.module.scss';

const Comment = ({ comment, formatDate, updateComment }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const handleLikeComment = () => {
        const newLikes = isLiked ? comment.likes - 1 : comment.likes + 1;
        setIsLiked(!isLiked);
        updateComment(comment.id, { likes: newLikes });
    };

    const handleSaveEdit = (event) => {
        const newText = event.target.value;
        updateComment(comment.id, { text: newText });
        setIsEditing(false);
    };

    return (
        <li className={styles.commentItem}>
            <div className={styles.commentHeader}>
                <strong>{comment.author}</strong>
                <span className={styles.commentDate}>
                    ({formatDate(comment.createdAt)})
                </span>
            </div>
            
            {isEditing ? (
                <textarea
                    className={styles.commentEditArea}
                    defaultValue={comment.text}
                    onBlur={handleSaveEdit}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveEdit(e);
                    }}
                    autoFocus
                />
            ) : (
                <p 
                    onDoubleClick={() => setIsEditing(true)} 
                    title="Двойной клик для редактирования"
                >
                    {comment.text}
                </p>
            )}
            
            <div className={styles.commentActions}>
                <button 
                    onClick={handleLikeComment} 
                    className={isLiked ? styles.commentLiked : ''}
                >
                    {isLiked ? 'Отменить' : 'Лайк'} ({comment.likes})
                </button>
            </div>
        </li>
    );
};

export default Comment;