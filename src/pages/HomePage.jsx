import React from 'react';
import styles from './Pages.module.scss';

const HomePage = () => {
    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.title}>Добро пожаловать!</h1>
            <p className={styles.subtitle}>
                Перейдите на вкладку <a href="/articles">"Статьи"</a>, чтобы увидеть список постов.
            </p>
        </div>
    );
};

export default HomePage;