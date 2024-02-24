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
                <p className={styles.personaltitle}><i>Passions in Passing</i></p>
                <div className={styles.carousel}>
                    <p className={styles.carouselTitle}>PHOTOGRAPHY</p>
                    <Carousel slides={SLIDES} options={OPTIONS} id ="photography"/>
                </div>
                <p className={styles.personalintro}>
                    In every fleeting moment, there is a story to be told. Photography is a snapshot of that story, a glimpse of raw emotion; I hope to capture that with every photo I take.
                    Although I've much to learn, I'm looking forward to improving alongside friends, creating a record of our past with each click of the camera.
                </p>
                <hr style={{width: "30rem", margin: "4rem"}}></hr>
                <div className={styles.carousel}>
                    <p className={styles.carouselWriting}>WRITING</p>
                    <Carousel slides={WRITING} options={OPTIONS} id="writing"/>
                    <p className={styles.personalwriting}>
                    Writing is another passion of mine. It's a way for me to express myself and what I've gathered in my short time here. In the past, I worked on my high school's award-winning newspaper,
                    the HiLite Newsmagazine, where I was given the opportunity to reach a much wider audience, including teachers and school administration.
                     Here are a couple of my best works, from opinion pieces to editorials I directed:
                    <br/><a href="https://hilite.org/79118/perspectives/students-should-always-consider-every-perspective-be-more-understanding-of-fear/#" target="_blank" rel="noopener noreferrer">
                        Light in the Dark
                    </a>
                    <br/><a href="https://hilite.org/81427/perspectives/journalists-should-evaluate-controversy-policies-readers-should-hold-staffs-accountable/" target="_blank" rel="noopener noreferrer">
                        Source Anonymity
                    </a>
                    <br/><a href="https://hilite.org/76106/perspectives/chs-must-make-sexual-assault-policies-more-transparent-for-students-survivors-to-feel-safe/" target="_blank" rel="noopener noreferrer">
                        SA Criticism
                    </a>
                    </p>
                </div>
                <hr style={{width: "30rem", margin: "4rem 0 1rem 0"}}></hr>
                <Hobbies/>
                <div style={{height: "8rem"}}></div>
        </div>
    );
};

export default Personal;