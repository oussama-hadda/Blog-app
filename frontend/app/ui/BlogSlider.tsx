"use client";

import React, {useState, useEffect} from 'react';
import {Blog} from '../types';
import styles from './BlogSliderStyles.module.css';
import {Button} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface BlogSliderProps {
    blogs: Blog[];
}

const BlogSlider: React.FC<BlogSliderProps> = ({blogs}) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % blogs.length);
        }, 7000);

        return () => clearInterval(interval);
    }, [blogs.length]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % blogs.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + blogs.length) % blogs.length);
    };

    const currentBlog = blogs[currentIndex];

    return (
        <div className={styles.sliderContainer}>
            <Button onClick={handlePrev} className={styles.navButton} ><ArrowBackIosIcon className={styles.navIcon}/></Button>
            <div className={styles.blogContent}>
                <img src={currentBlog.image} alt={currentBlog.title} className={styles.blogImage}/>
                <div className={styles.blogInfo}>
                    <h2>{currentBlog.title}</h2>
                    <p>{currentBlog.description}</p>
                </div>
            </div>
            <Button onClick={handleNext} className={styles.navButton}><ArrowForwardIosIcon className={styles.navIcon}/></Button>
        </div>
    );
};

export default BlogSlider;
