import styles from '../styles/Home.module.css';
import React, { useEffect, useRef, useState } from 'react';

const Intro = () => {
    const observedElementRef = useRef(null);
    const targetElementRef = useRef(null);
    useEffect(() => {
      const elements = targetElementRef.current;
      const first = document.querySelector(`.${styles.first}`);
      console.log(first)
      console.log(elements)
      if (observedElementRef && targetElementRef) {
        const handleIntersection = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log("not here")
                    elements.classList.remove(styles.background);
                } else {
                    console.log("here")
                    elements.classList.add(styles.background);
                }
            });
        };
        const intersectionObserver = new IntersectionObserver(handleIntersection, {
            threshold: 0.12,
            rootMargin: "-" + document.documentElement.clientHeight * 0.5 + "px " + document.documentElement.clientHeight * 0.5 + "px " + document.documentElement.clientHeight * 0.80 +  "px " + document.documentElement.clientHeight * 0.8 + "px",
        });

        intersectionObserver.observe(first);

        return () => {
            intersectionObserver.unobserve(first);
        };
      }
    }, []);

    useEffect(() => {
        const targetElement = targetElementRef.current;
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const transparency = scrollPosition / 500;

            targetElement.style.background = `rgba(36, 42, 48, ${0.1 + transparency}) url(https://i.ibb.co/HTXqPP5/daniel-tian-website-2.jpg)`;
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const elements = document.querySelectorAll(`.${styles.introsub}`);

        if (elements) {
            const handleIntersection = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.show);
                        console.log("hi")
                    } else {
                        entry.target.classList.remove(styles.show);
                        console.log("bye")
                    }
                });
            };


            const intersectionObserver = new IntersectionObserver(handleIntersection, {
                threshold: 1,
                rootMargin:  -document.documentElement.clientHeight * 0.3 + "px 0px 0px 0px",
            });

            elements.forEach(element => {
                intersectionObserver.observe(element);
            });

            return () => {
                elements.forEach(element => {
                intersectionObserver.unobserve(element);
                });
            };

        }
    })

    useEffect(() => {
        const header = document.querySelector(`.${styles.header}`);
        const intro = document.querySelector(`.${styles.intro}`);
        if (header && intro) {
            const handleIntersection = (entries, observer) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        header.classList.add(styles.scrolled);
                    } else {
                        header.classList.remove(styles.scrolled);
                    }
                });
            };
            const intersectionObserver = new IntersectionObserver(handleIntersection, {
                threshold: 0.1,
                rootMargin: "0px 0px 0px 0px",
            });

            intersectionObserver.observe(intro);

            return () => {
                intersectionObserver.unobserve(intro);
            };
        }


    });

    const [fontSize, setFontSize] = useState('2vh')
    const [top, setTop] = useState('-0.6vh')

    return (
        <>
            <div className={styles.header}>
                <a href="#" className={styles.site_logo} aria-label="homepage">DANIEL TIAN</a>
                <nav>
                <ul className={styles.nav__list}>
                    <li className={styles.nav__list}>
                        <a href="#" className={styles.nav__link}>Home</a>
                    </li>
                    <li class="nav__list-item">
                        <a href="#About" className={styles.nav__link}>About</a>
                    </li>
                    <li class="nav__list-item">
                        <a href="#Projects" className={styles.nav__link}>Projects</a>
                    </li>
                    <li class="nav__list-item">
                        <a href="#Personal" className={styles.nav__link}>Personal</a>
                    </li>
                    <li class="nav__list-item">
                        <a href="#Contact" className={styles.nav__link}>Contact Me</a>
                    </li>
                </ul>
                </nav>
            </div>

            <container className={styles.homeintro} ref={targetElementRef}>
            </container>

            <div className={styles.intro}>
                <h1 className={styles.introname}>
                    Daniel Tian
                </h1>
                <a className={styles.introsub} href="#About"> <span style={{ fontSize: fontSize, position: 'relative', top: top }}>❀</span> Developer</a>
                <a className={styles.introsub} href="#Projects"> <span style={{ fontSize: fontSize, position: 'relative', top: top }}>❀</span> Designer</a>
                <a className={styles.introsub} href="#Personal"> <span style={{ fontSize: fontSize, position: 'relative', top: top }}>❀</span> <b><i>Dreamer.</i></b></a>
            </div>

            

        </>
    );

}

export default Intro;