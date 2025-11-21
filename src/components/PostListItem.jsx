import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PostCard.module.scss'; 
import classNames from 'classnames';

const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + '...';
};

const PostListItem = ({ postData, formatDate }) => {
    
    const cardClasses = classNames(styles.postCard, styles.listItem);
    
    if (!postData) return null;

    return (
        <div className={cardClasses}>
            <Link to={`/articles/${postData.id}`} className={styles.titleLink}>
                <h3>{postData.title}</h3>
            </Link>
            
            <p>
                {truncateText(postData.text, 100)}
                {postData.text.length > 100 && (
                    <Link to={`/articles/${postData.id}`} className={styles.readMore}>
                        {' '}...Читать далее
                    </Link>
                )}
            </p>

            <div className={styles.cardFooter}>
                <span className={styles.likesCount}>Лайки: {postData.currentLikes}</span>
                <span className={styles.createdAt}>Создано: {formatDate(postData.createdAt)}</span>
            </div>
            
            <div className={styles.cardActions}>
                 <Link to={`/articles/${postData.id}`} className={styles.viewButton}>
                    Открыть пост
                </Link>
            </div>
        </div>
    );
};

export default PostListItem;