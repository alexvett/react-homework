import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortPosts } from '../redux/postsSlice';
import PostListItem from '../components/PostListItem.jsx';
import SortButtons from '../components/SortButtons.jsx';
import styles from '../App.module.scss';
import pageStyles from './Pages.module.scss';

const ArticlesPage = ({ formatDate }) => {
    const dispatch = useDispatch();
    
    const posts = useSelector((state) => state.posts.items);
    const status = useSelector((state) => state.posts.status);
    const error = useSelector((state) => state.posts.error);
    
    const [sortOrder, setSortOrder] = useState('newest');

    const handleSortPosts = (criteria) => {
        dispatch(sortPosts(criteria));
        setSortOrder(criteria);
    };

    if (status === 'loading') {
        return <div className={pageStyles.pageContainer}><h1>Загрузка постов...</h1></div>;
    }

    if (status === 'failed') {
        return <div className={pageStyles.pageContainer}><h1>Ошибка загрузки: {error}</h1></div>;
    }

    return (
        <div className={pageStyles.pageContainer}>
            <h1 className={pageStyles.title}>Список статей ({posts.length})</h1>
            
            <SortButtons 
                onSort={handleSortPosts} 
                currentSort={sortOrder}
                label="Сортировать список:"
            />
            
            <div className={styles.postsContainer}>
                {posts.map((post) => (
                    <PostListItem
                        key={post.id}
                        postData={post}
                        formatDate={formatDate}
                    />
                ))}
            </div>
        </div>
    );
};

export default ArticlesPage;