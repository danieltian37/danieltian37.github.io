import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Down from './down';
import ContactForm from './contactform';

const Contact = () => {
    const words = [
        "/contact/c1.JPG", "/contact/c2.jpg", "/contact/advnt.jpg",
        "/contact/c4.JPG", "/contact/c5.JPG", "/contact/fountain.jpg"
    ]
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
            }, 5000);
        }
        return () => clearInterval(interval);
    });

    return (<div className={`${styles.container} ${styles.contact}`} id = "Contact">
            <Down link="#Contact" color="black"/>
            <ContactForm/>
                <Image
                src = {currWord}
                width = {0}
                height = {0}
                loading = "lazy"
                style = {{objectFit: 'cover', zIndex: -1, height: '100%', width: '100%', position: 'absolute', bottom: 0, opacity: 0.5, filter: 'blur(4px)', transition: 'all 2s ease-in-out'}}
                sizes = "100vw"
                />
          </div>)
}

export default Contact;