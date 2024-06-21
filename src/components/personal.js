import React, { useState, useContext } from 'react';
import styles from '../styles/Home.module.css';
import GlobalContext from '../context/globalcontext';
import Carousel from './carousel/carousel.js'
import Hobbies from './hobbies.js'
import Down from './down.js'

const OPTIONS = { loop: true }
const SLIDE_COUNT = 6
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const WRITING_COUNT = 3
const WRITING = Array.from(Array(WRITING_COUNT).keys())

const Personal = () => {

    return (
        <div className={`${styles.container} ${styles.personal}`} id = "Personal"> 
                <Down link="#Personal" color="white"/>
                <p className={styles.personaltitle}><i>who am i?</i></p>
                <p className={styles.personalintro}>
                    I'm Daniel Tian, and I was born into a storytelling family. I was raised on silly memories, Chinese legends, and everything in between. 
                    For as long as I've known language, I've loved stories: the motivations, characters, worlds, lives, emotions, and lessons that each carry. 
                    All of my interests reflect that love, and I hope to share that with you below!
                </p>
                <hr style={{width: "30rem", margin: "4rem"}}></hr>
                <div className={styles.carousel}>
                    <p className={styles.carouselTitle}>PHOTOGRAPHY</p>
                    <Carousel slides={SLIDES} options={OPTIONS} id ="photography"/>
                </div>
                <p className={styles.personalintro}>
                    To me, photos are snapshots of stories, a glimpse of emotion. I hope to capture a compelling story with every photo I take.
                    Although I've much to learn, I'm looking forward to improving alongside friends, creating a record of our past with each click of the camera.
                </p>
                <hr style={{width: "30rem", margin: "4rem 0 1rem 0"}}></hr>
                <Hobbies/>
                <div style={{height: "8rem"}}></div>
        </div>
    );
};

export default Personal;