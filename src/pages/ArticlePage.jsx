import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PostCard from '../components/PostCard.jsx';
import pageStyles from './Pages.module.scss';

const ArticlePage = ({ formatDate }) => {
    const { articleId } = useParams();
    const navigate = useNavigate();

    const status = useSelector((state) => state.posts.status);
    
    const postId = parseInt(articleId, 10);
    
    const postData = useSelector(state => 
        state.posts.items.find(post => post.id === postId)
    );
    
    if (status === 'loading') {
        return <div className={pageStyles.pageContainer}><h1>Загрузка...</h1></div>;
    }
    
    if (!postData) {
        return (
            <div className={pageStyles.pageContainer}>
                <h1>404: Пост не найден</h1>
                <p>Пост с ID {articleId} не существует или был удален.</p>
                <button 
                    onClick={() => navigate('/articles')}
                    className={pageStyles.homeButton}
                >
                    Перейти к списку статей
                </button>
            </div>
        );
    }

    return (
        <div className={pageStyles.pageContainer} style={{maxWidth: '800px'}}>
            <button 
                onClick={() => navigate('/articles')}
                className={pageStyles.homeButton}
                style={{ alignSelf: 'flex-start', marginBottom: '20px' }}
            >
                {'<'} Назад к списку
            </button>
            
            <h1 className={pageStyles.title}>Детализация статьи: {postData.title}</h1>
            
            <PostCard 
                postId={postId}
                formatDate={formatDate}
            />
        </div>
    );
};

export default ArticlePage;