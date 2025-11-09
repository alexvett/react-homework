import React from 'react';
import './App.css';
import { postsData } from './assets/data.js';
import PostCard from './components/PostCard.jsx';

function App() {
   return (
    <div className="app">
      <h1>Лента постов</h1>
    <div className="posts-container">
        {postsData.map((post) => (
          <PostCard
            key={post.title}
            title={post.title}
            text={post.text}
            currentLikes={post.currentLikes}
            comments={post.comments}
          />
        ))}
      </div>
    </div>
 );
}

export default App;