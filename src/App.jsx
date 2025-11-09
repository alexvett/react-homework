import React, { useState } from 'react';
import styles from './App.module.scss';
import { postsData as initialPostsData } from './assets/data.js'; 
import PostCard from './components/PostCard.jsx'; 
import SortButtons from './components/SortButtons.jsx';

function App() {
  const [posts, setPosts] = useState(initialPostsData);
  const [sortOrder, setSortOrder] = useState('newest'); 

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('ru-RU');
  };

  const updatePost = (postId, updatedFields) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId ? { ...post, ...updatedFields } : post
      )
    );
  };
  
  const handleSortPosts = (criteria) => {
    let sortedPosts = [...posts];

    if (criteria === 'newest') {
      sortedPosts.sort((a, b) => b.createdAt - a.createdAt);
    } else if (criteria === 'oldest') {
      sortedPosts.sort((a, b) => a.createdAt - b.createdAt);
    } else if (criteria === 'likes') {
      sortedPosts.sort((a, b) => b.currentLikes - a.currentLikes);
    }
    
    setSortOrder(criteria);
    setPosts(sortedPosts);
  };

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
            postData={post}
            formatDate={formatDate}
            updatePost={updatePost}
          />
        ))}
      </div>
    </div>
  );
}

export default App;