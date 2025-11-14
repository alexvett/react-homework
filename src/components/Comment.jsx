import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateComment } from '../redux/postsSlice';
import styles from './CommentList.module.scss'; 

const Comment = ({ postId, comment, formatDate }) => {
    const dispatch = useDispatch();
    
    const [isLiked, setIsLiked] = useState(false);

    const handleLikeComment = () => {
        const newIsLiked = !isLiked;
        const newLikes = newIsLiked ? comment.likes + 1 : comment.likes - 1;
        
        setIsLiked(newIsLiked);
        dispatch(updateComment({ 
            postId: postId,
            commentId: comment.id, 
            updatedFields: { likes: newLikes } 
        }));
    };

    const handleSaveEdit = (event) => {
        const newText = event.target.value;
        if (!newText || newText === comment.text) {
            setIsEditing(false);
            return;
        }
        
        dispatch(updateComment({ 
            postId: postId,
            commentId: comment.id, 
            updatedFields: { text: newText } 
        }));
        setIsEditing(false);
    };
    
    const [isEditing, setIsEditing] = useState(false);

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
                        if (e.key === 'Enter' && !e.shiftKey) handleSaveEdit(e);
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