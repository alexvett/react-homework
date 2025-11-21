import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Pages.module.scss';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.subtitle}>Страница не найдена</p>
            <p className={styles.text}>
                Такой URL-адрес не существует.
            </p>
            <button 
                onClick={() => navigate('/')}
                className={styles.homeButton}
            >
                Перейти на главную
            </button>
        </div>
    );
};

export default NotFoundPage;