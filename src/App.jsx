import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './redux/store';
import { fetchPosts, sortPosts } from './redux/postsSlice';

import styles from './App.module.scss';
import PostCard from './components/PostCard.jsx'; 
import SortButtons from './components/SortButtons.jsx';

const AppContent = () => {
  const dispatch = useDispatch();
  
  const posts = useSelector((state) => state.posts.items);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
  };

  const handleSortPosts = (criteria) => {
    dispatch(sortPosts(criteria));
    setSortOrder(criteria);
  };

  if (status === 'loading') {
    return <div className={styles.app}><h1>Загрузка постов...</h1></div>;
  }

  if (status === 'failed') {
    return <div className={styles.app}><h1>Ошибка загрузки: {error}</h1></div>;
  }

  return (
    <div className={styles.app}>
      <h1>Лента постов</h1>
      
      <SortButtons 
        onSort={handleSortPosts} 
        currentSort={sortOrder}
        label="Сортировать посты:"
      />
      
      <div className={styles.postsContainer}>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            postId={post.id}
            formatDate={formatDate}
          />
        ))}
      </div>
    </div>
  );
};

function App() {
    return (
        <Provider store={store}>
            <AppContent />
        </Provider>
    );
}

export default App;