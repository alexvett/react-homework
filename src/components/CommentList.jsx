import React, { useState, useEffect } from 'react';
import Comment from './Comment.jsx';
import SortButtons from './SortButtons.jsx';
import styles from './CommentList.module.scss'; 

const CommentList = ({ postId, comments, formatDate }) => {
    const [sortedComments, setSortedComments] = useState(comments);
    const [sortOrder, setSortOrder] = useState('newest');

    useEffect(() => {
        handleSortComments(sortOrder, comments);
    }, [comments]);

    const sortArray = (arr, criteria) => {
        let newSorted = [...arr];
        if (criteria === 'newest') {
            newSorted.sort((a, b) => b.createdAt - a.createdAt);
        } else if (criteria === 'oldest') {
            newSorted.sort((a, b) => a.createdAt - b.createdAt); 
        } else if (criteria === 'likes') {
            newSorted.sort((a, b) => b.likes - a.likes);
        }
        return newSorted;
    }

    const handleSortComments = (criteria, currentComments = sortedComments) => {
        const newSortedComments = sortArray(currentComments, criteria);
        
        setSortOrder(criteria);
        setSortedComments(newSortedComments);
    };

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

            {sortedComments.length > 0 ? (
                <ul className={styles.commentList}>
                    {sortedComments.map(comment => (
                        <Comment 
                            key={comment.id}
                            postId={postId}
                            comment={comment}
                            formatDate={formatDate}
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