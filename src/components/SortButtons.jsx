import React from 'react';
import styles from './SortButtons.module.scss';

const SortButtons = ({ onSort, currentSort, label, dateLabel = 'По дате', likesLabel = 'По лайкам' }) => {

    const getButtonClass = (criteria) => {
        return currentSort === criteria ? styles.active : '';
    }

    return (
        <div className={styles.sortWrapper}>
            <span className={styles.label}>{label}</span>
            <button 
                className={getButtonClass('newest')} 
                onClick={() => onSort('newest')}
            >
                {dateLabel} (Новые)
            </button>
            <button 
                className={getButtonClass('oldest')} 
                onClick={() => onSort('oldest')}
            >
                {dateLabel} (Старые)
            </button>
            <button 
                className={getButtonClass('likes')} 
                onClick={() => onSort('likes')}
            >
                {likesLabel}
            </button>
        </div>
    );
};

export default SortButtons;