import React, { useState, useContext } from 'react';
import styles from '../styles/Home.module.css';
import GlobalContext from '../context/globalcontext';
import Carousel from './carousel/carousel.js'
import Down from './down.js'

const OPTIONS = { loop: true }
const SLIDE_COUNT = 6
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const Personal = () => {

    return (
        <div className={`${styles.container} ${styles.personal}`} id = "Personal"> 
                <Down link="#Personal" color="white"/>
                <p className={styles.personaltitle}><i>Passions in Passing</i></p>
                <p className={styles.personalintro}></p>
                <div className={styles.carousel}>
                    <p className={styles.carouselTitle}>PHOTOGRAPHY</p>
                    <Carousel slides={SLIDES} options={OPTIONS}/>
                </div>
        </div>
    );
};

export default Personal;