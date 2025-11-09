import React, { useState } from 'react';
import Comment from './Comment.jsx';
import SortButtons from './SortButtons.jsx';
import styles from './CommentList.module.scss';

const CommentList = ({ comments, setComments, formatDate, updateComment }) => {
    const [sortOrder, setSortOrder] = useState('newest');

    const handleSortComments = (criteria) => {
        let sortedComments = [...comments];

        if (criteria === 'newest') {
            sortedComments.sort((a, b) => b.createdAt - a.createdAt);
        } else if (criteria === 'oldest') {
            sortedComments.sort((a, b) => a.createdAt - a.createdAt);
        } else if (criteria === 'likes') {
            sortedComments.sort((a, b) => b.likes - a.likes);
        }
        
        setSortOrder(criteria);
        setComments(sortedComments);
    };
    
    if (sortOrder === 'oldest') {
        comments.sort((a, b) => a.createdAt - b.createdAt);
    }

    return (
        <>
            <h4>Комментарии:</h4>
            
            <SortButtons 
                onSort={handleSortComments} 
                currentSort={sortOrder}
                label="Сортировать комментарии:"
                dateLabel="По дате"
                likesLabel="По лайкам"
            />

            {comments.length > 0 ? (
                <ul className={styles.commentList}>
                    {comments.map(comment => (
                        <Comment 
                            key={comment.id}
                            comment={comment}
                            formatDate={formatDate}
                            updateComment={updateComment}
                        />
                    ))}
                </ul>
            ) : (
                <p className={styles.noComments}>Нет комментариев.</p>
            )}
        </>
    );
};

export default CommentList;