import React, { useEffect, useState, useRef } from 'react';
import styles from '../styles/Home.module.css';

const Hobbies = () => {
    const words = ['to read (ask me my favs)', 'to crochet', 'music (Nujabes/anything)', 'to dance (modern/hiphop)', "to cook (can't in my dorm..)", 'to explore.']
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
                I spend a lot of free time learning. I'm nowhere near the best or most decorated at what I do, but I like the process of picking stuff up,
                feeling the accomplishment of adding a little something everyday.
            </p>

            <p className={styles.hobbiesend}>
                But most of all, I love to connect.
            </p>
            <p className={styles.personalconclusion}>
                I love to learn from, talk to, and help teach people.
                All that I like would be no fun without what I love.
                I truly believe that everyone's got a story to tell, a voice to be heard, and a lesson to teach.
                <br/><br/>That goes for you, too! I'd love to hear from you below!
            </p>
        </>
    
    
    )
}

export default Hobbies;