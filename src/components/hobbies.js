import React, { useEffect, useState, useRef } from 'react';
import styles from '../styles/Home.module.css';

const Hobbies = () => {
    const words = ['to read (ask me my favs)', 'natural history (archaeopteryx <3)', 'music (Nujabes/anything)', 'to dance (modern/hiphop)', "to cook (can't in my dorm..)", 'to explore.']
    const [currWord, setCurrWord] = useState(words[0]);
    const [isActive, setIsActive] = useState(true);

    const index = useRef(0);
    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                index.current++;
                setCurrWord(words[index.current]);
                if (index.current === words.length) {
                    index.current = 0;
                    setCurrWord(words[0]);
                }
            }, 1500);
        }
        return () => clearInterval(interval);
    });

    return (
        <>
        <div style={{margin: "-2rem 0 2rem 0"}}>
            <p className={styles.hobbiestitle}>
                I like {currWord}
            </p>
        </div>
            <p className={styles.personalintro}>
                I spend a lot of free time learning. I'm nowhere near the best or most decorated at what I do, but I deeply enjoy the process of picking stuff up,
                feeling the accomplishment of adding a little something everyday.
            </p>

            <p className={styles.hobbiesend}>
                But most of all, I love to connect.
            </p>
            <p className={styles.personalconclusion}>
                <b>I love to learn from, talk to, and collaborate with people. <br></br>
                All that I like would be no fun without what I love. <br></br>
                I truly believe that everyone's got a voice to be heard, a lesson to teach, and a story to tell. </b>
                <br/><br/>Obviously, that goes for you, too! I'd love to hear from you below!
            </p>
        </>
    
    
    )
}

export default Hobbies;