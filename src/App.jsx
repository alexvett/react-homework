import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { store } from './redux/store';
import { fetchPosts } from './redux/postsSlice';

import styles from './App.module.scss';

import HomePage from './pages/HomePage.jsx'; 
import ArticlesPage from './pages/ArticlesPage.jsx'; 
import ArticlePage from './pages/ArticlePage.jsx'; 
import NotFoundPage from './pages/NotFoundPage.jsx';

const DateFormatterWrapper = () => {
    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        return new Date(timestamp).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Router>
            <AppContent formatDate={formatDate} />
        </Router>
    )
}

const AppContent = ({ formatDate }) => {
  const dispatch = useDispatch();
  
  const status = useSelector((state) => state.posts.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);


  return (
    <div className={styles.app}>
        <nav className={styles.navbar}>
            <Link to="/" className={styles.navLink}>Главная</Link>
            <Link to="/articles" className={styles.navLink}>Статьи</Link>
        </nav>

        <div className={styles.content}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                
                <Route path="/articles" element={<ArticlesPage formatDate={formatDate} />} />
                
                <Route 
                    path="/articles/:articleId" 
                    element={<ArticlePage formatDate={formatDate} />} 
                />
                
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    </div>
  );
};

function App() {
    return (
        <Provider store={store}>
            <DateFormatterWrapper />
        </Provider>
    );
}

export default App;