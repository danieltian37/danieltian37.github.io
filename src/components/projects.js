import React, { useEffect, useContext } from 'react';
import GlobalContext from './globalcontext';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Projects = () => {
    const context = useContext(GlobalContext);
    const handleClick = () => {
        context.setIsVisible1(false);
        context.setIsVisible2(false);
        context.setIsVisible3(false);
        context.setIsVisible4(false);
    }

    useEffect(() => {
      const handleScroll = () => {
        context.setIsVisible1(false);
        context.setIsVisible2(false);
        context.setIsVisible3(false);
        context.setIsVisible4(false);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    useEffect(() => {
        const project = document.querySelector(`.${styles.projectPopup}`)
        console.log(context.isVisible1)
        if (project) {
            const timeoutId = setTimeout(() => {
                console.log('Made visible');
                project.classList.add(styles.visible);
            }, 20);
        }
    }, [context.isVisible1, context.isVisible2, context.isVisible3, context.isVisible4])

    return (
        <>
            {context.isVisible1 && (
                <div className={`${styles.projectPopup}`}>
                    <Link href = "https://virtual-fridge-9vs8.onrender.com" target="_blank" rel="noopener noreferrer">
                        <Image
                            src = "/fridgedemo.gif"
                            width = {0}
                            height = {0}
                            sizes = "100vw"
                            style = {{ width: 'auto', height: '50vh', opacity: 1, padding: "1vh 2vw 1vh 2vw" }}
                            alt = "Fridge Demonstration"
                        />
                    </Link>


                    <p className={styles.projectDescription}>Virtual Refrigerator</p>
                    <p className={styles.projectDescription}></p>


                    <p onClick={handleClick} style={{ cursor: 'pointer', fontWeight: '1000', margin: '0 0 1vh 0' }}>x</p>

                    <p onClick={context.leftButton} className={styles.projectButtonLeft}>&lt;</p>
                    <p onClick={context.rightButton} className={styles.projectButtonRight}>&gt;</p>
                </div>
            )}
            {context.isVisible2 && (
                <div className={`${styles.projectPopup}`}>
                    <Image
                        src = "/scramblerdemo.gif"
                        width = {0}
                        height = {0}
                        sizes = "100vw"
                        style = {{ width: 'auto', height: '50vh', opacity: 1, padding: "1vh 2vw 1vh 2vw" }}
                        alt = "Scrambler Demonstration"
                    />
                    <p>Scrambler guy</p>
                    <p onClick={handleClick} style={{ cursor: 'pointer' }}>x</p>
                    <p onClick={context.leftButton} className={styles.projectButtonLeft}>&lt;</p>
                    <p onClick={context.rightButton} className={styles.projectButtonRight}>&gt;</p>
                </div>
            )}
            {context.isVisible3 && (
                <div className={`${styles.projectPopup}`}>
                    <p>Monopobobility guy </p>
                    <p onClick={handleClick} style={{ cursor: 'pointer' }}>x</p>
                    <p onClick={context.leftButton} className={styles.projectButtonLeft}>&lt;</p>
                    <p onClick={context.rightButton} className={styles.projectButtonRight}>&gt;</p>
                </div>
            )}
            {context.isVisible4 && (
                <div className={`${styles.projectPopup}`}>
                    <p>StoreChat guy </p>

                    <p onClick={handleClick} style={{ cursor: 'pointer' }}>x</p>
                    <p onClick={context.leftButton} className={styles.projectButtonLeft}>&lt;</p>
                    <p onClick={context.rightButton} className={styles.projectButtonRight}>&gt;</p>
                </div>
            )}
        </>
    )
}

export default Projects;