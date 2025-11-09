import React, { useState } from 'react';
import classNames from 'classnames'; 
import styles from './PostCard.module.scss'; 
import CommentList from './CommentList.jsx';

const PostCard = ({ postData, updatePost, formatDate }) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingText, setIsEditingText] = useState(false);

    const [likes, setLikes] = useState(postData.currentLikes);
    const [isLiked, setIsLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);

    const [comments, setComments] = useState(postData.comments);

    const handleLikeClick = () => {
        const newLikes = isLiked ? likes - 1 : likes + 1;
        setLikes(newLikes);
        setIsLiked(!isLiked);
        updatePost(postData.id, { currentLikes: newLikes });
    };

    const handleToggleComments = () => {
        setShowComments(!showComments); 
    };

    const handleSaveEdit = (field, event) => {
        const newValue = event.target.value;
        if (field === 'title') {
            updatePost(postData.id, { title: newValue });
            setIsEditingTitle(false);
        } else if (field === 'text') {
            updatePost(postData.id, { text: newValue });
            setIsEditingText(false);
        }
    };
    
    const updateComment = (commentId, updatedFields) => {
        setComments(prevComments => 
            prevComments.map(comment => 
                comment.id === commentId ? { ...comment, ...updatedFields } : comment
            )
        );
        updatePost(postData.id, { comments: comments.map(c => 
            c.id === commentId ? { ...c, ...updatedFields } : c
        )});
    };

    const cardClasses = classNames(styles.postCard, { [styles.liked]: isLiked });

    return (
        <div className={cardClasses}>
            {isEditingTitle ? (
                <input
                    type="text"
                    defaultValue={postData.title}
                    onBlur={(e) => handleSaveEdit('title', e)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveEdit('title', e);
                    }}
                    autoFocus
                />
            ) : (
                <h3 onDoubleClick={() => setIsEditingTitle(true)} title="Двойной клик для редактирования">
                    {postData.title}
                </h3>
            )}
            
            {isEditingText ? (
                <textarea
                    defaultValue={postData.text}
                    onBlur={(e) => handleSaveEdit('text', e)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveEdit('text', e);
                    }}
                    autoFocus
                />
            ) : (
                <p onDoubleClick={() => setIsEditingText(true)} title="Двойной клик для редактирования">
                    {postData.text}
                </p>
            )}

            <div className={styles.cardFooter}>
                <span className={styles.likesCount}>Лайки: {likes}</span>
                <span className={styles.createdAt}>Создано: {formatDate(postData.createdAt)}</span>
                <span className={styles.commentsCount}>Комментарии: {comments.length}</span>
            </div>

            <div className={styles.cardActions}>
                <button onClick={handleLikeClick} className={styles.likeButton}>
                    {isLiked ? 'Отменить лайк' : 'Поставить лайк'}
                </button>
                <button onClick={handleToggleComments} className={styles.commentsButton}>
                    {showComments ? 'Скрыть комментарии' : 'Открыть комментарии'}
                </button>
            </div>

            {showComments && (
                <div className={styles.commentsSection}>
                    <CommentList 
                        comments={comments} 
                        setComments={setComments}
                        formatDate={formatDate}
                        updateComment={updateComment}
                    />
                </div>
            )}
        </div>
    );
};

export default PostCard;