import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../redux/postsSlice';
import classNames from 'classnames'; 
import styles from './PostCard.module.scss'; 
import CommentList from './CommentList.jsx'; 

const PostCard = ({ postId, formatDate }) => {

    const dispatch = useDispatch();
    
    const [isEditingTitle, setIsEditingTitle] = useState(false); 
    const [isEditingText, setIsEditingText] = useState(false);  
    const [isLiked, setIsLiked] = useState(false); 
    const [showComments, setShowComments] = useState(true); 

    const postData = useSelector(state => 
        state.posts.items.find(post => post.id === postId)
    );

    if (!postData) return null;

    const handleLikeClick = () => {
        const newIsLiked = !isLiked;
        const newLikes = newIsLiked ? postData.currentLikes + 1 : postData.currentLikes - 1;
        
        setIsLiked(newIsLiked);
        dispatch(updatePost({ 
            postId: postData.id, 
            updatedFields: { currentLikes: newLikes } 
        }));
    };

    const handleToggleComments = () => {
        setShowComments(!showComments); 
    };

    const handleSaveEdit = (field, event) => {
        const newValue = event.target.value;
        if (field === 'title') {
            dispatch(updatePost({ postId: postData.id, updatedFields: { title: newValue } }));
            setIsEditingTitle(false);
        } else if (field === 'text') {
            dispatch(updatePost({ postId: postData.id, updatedFields: { text: newValue } }));
            setIsEditingText(false);
        }
    };
    
    const cardClasses = classNames(styles.postCard, { [styles.liked]: isLiked, [styles.detailView]: true }); 

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
                        if (e.key === 'Enter' && !e.shiftKey) handleSaveEdit('text', e);
                    }}
                    autoFocus
                />
            ) : (
                <p onDoubleClick={() => setIsEditingText(true)} title="Двойной клик для редактирования">
                    {postData.text}
                </p>
            )}

            <div className={styles.cardFooter}>
                <span className={styles.likesCount}>Лайки: {postData.currentLikes}</span>
                <span className={styles.createdAt}>Создано: {formatDate(postData.createdAt)}</span>
                <span className={styles.commentsCount}>Комментарии: {postData.comments.length}</span>
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
                        postId={postData.id}
                        comments={postData.comments} 
                        formatDate={formatDate}
                    />
                </div>
            )}
        </div>
    );
};

export default PostCard;