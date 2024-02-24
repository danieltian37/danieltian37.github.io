import React, { useEffect, useContext } from 'react';
import GlobalContext from '../context/globalcontext';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { myFluid } from './fluidsim';

const Projects = () => {
    const context = useContext(GlobalContext);
    const handleClick = () => {
				const project = document.querySelector(`.${styles.projectPopup}`)
				if (project) {
					project.classList.remove(styles.visible);
					const timeoutId = setTimeout(() => {
						context.setIsVisible1(false);
						context.setIsVisible2(false);
						context.setIsVisible3(false);
						context.setIsVisible4(false);
						context.setClicked(false);
					}, 200);
				}
    }

    useEffect(() => {

      const handleScroll = () => {
				const project = document.querySelector(`.${styles.projectPopup}`)
				if (project) {
					project.classList.remove(styles.visible);
					const timeoutId = setTimeout(() => {
						context.setIsVisible1(false);
						context.setIsVisible2(false);
						context.setIsVisible3(false);
						context.setIsVisible4(false);
						context.setClicked(false);
					}, 200);
				}
      };
			window.addEventListener('scroll', handleScroll);

			
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);


    useEffect(() => {
        const project = document.querySelector(`.${styles.projectPopup}`)
        const graph = document.querySelector("svg")
        if (project) {
            const timeoutId = setTimeout(() => {
                project.classList.add(styles.visible);
            }, 20);

            project.addEventListener('mousemove', (e) => {
                myFluid.canvas.dispatchEvent(new MouseEvent('mousemove', event));
            });
            const handleMouseDown = (event) => {
                event.stopPropagation();
                console.log(event.target);
                console.log(graph);
                if (!(event.target === myFluid.canvas || event.target === graph || (project.contains(event.target)))) {
                    console.log("toggling");
                    handleClick();
                }   
            };

            document.addEventListener('mousedown', handleMouseDown);
            return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            };
        }

    }, [context])

    return (
        <>
            {context.isVisible1 && (
                <div className={`${styles.projectPopup}`}>
                    <h1 style ={{fontWeight: "400"}}>Virtual Refrigerator</h1>
                    <Link href = "https://virtual-fridge-9vs8.onrender.com" target="_blank" rel="noopener noreferrer">
                        <Image
                            src = "/fridgedemo.gif"
                            width = {0}
                            height = {0}
                            sizes = "100vw"
                            style = {{ width: 'auto', height: '50vh', opacity: 1, margin: "1vh 2vw 2vh 2vw" }}
                            alt = "Fridge Demonstration"
                        />
                    </Link>


                    <p className={styles.projectDescription}>My first full-stack project, I created the Virtual Refrigerator as part of the Launchpad initiative at Purdue. 
                    The fully functioning, token authenticated web application is built using <b>React, Node, Express, and MongoDB.</b> It's currently hosted on Render.com, and you can check it out 
                    by clicking the gif above!</p>

                    <p onClick={context.leftButton} className={styles.projectButtonLeft}>&lt;</p>
                    <p onClick={context.rightButton} className={styles.projectButtonRight}>&gt;</p>
                </div>
            )}
            {context.isVisible2 && (
                <div className={`${styles.projectPopup}`}>
                    <h1 style ={{fontWeight: "400"}}>Scrambler</h1>
                    <Image
                        src = "/scramblerdemo.gif"
                        width = {0}
                        height = {0}
                        sizes = "100vw"
                        style = {{ width: 'auto', height: '50vh', opacity: 1, margin: "1vh 2vw 0vh 2vw" }}
                        alt = "Scrambler Demonstration"
                    />
                    <p>Over the course of two months, I spent more than 100 hours building, calibrating, testing, rebuilding, recalibrating, and retesting the <b>Scrambler</b>, a build 
                    to compete as part of our Science Olympiad team. As President in 2023, I led our team to win Indiana State, breaking the all-time record with a score of 57.</p>
                    <p onClick={context.leftButton} className={styles.projectButtonLeft}>&lt;</p>
                    <p onClick={context.rightButton} className={styles.projectButtonRight}>&gt;</p>
                </div>
            )}
            {context.isVisible3 && (
                <div className={`${styles.projectPopup}`}>
										<h1 style ={{fontWeight: "400"}}>Monopobobility</h1>
                    <Image
                        src = "/monopobobilitydemo.gif"
                        width = {0}
                        height = {0}
                        sizes = "100vw"
                        style = {{ width: 'auto', height: '50vh', opacity: 1, margin: "1vh 2vw 1vh 2vw" }}
                        alt = "Monopobobility Demonstration"
                    />
                    <p>For my first hackathon, at Hello World!, I created an interactive, 3D representation of landing distributions created from simulating popular board game Monopoly. 
                        This project built my skills with Matplotlib and collaborating with teammates with different specialties under a strict deadline, and I was able to deliver and present a product in less than 24 hours.
                    </p>
                    <p onClick={context.leftButton} className={styles.projectButtonLeft}>&lt;</p>
                    <p onClick={context.rightButton} className={styles.projectButtonRight}>&gt;</p>
                </div>
            )}
            {context.isVisible4 && (
                <div className={`${styles.projectPopup}`}>
										<h1 style ={{fontWeight: "400"}}>StoreChat</h1>
                    <Image
                        src = "/storechatdemo.gif"
                        width = {0}
                        height = {0}
                        sizes = "100vw"
                        style = {{ width: 'auto', height: '50vh', opacity: 1, margin: "1vh 2vw 1vh 2vw" }}
                        alt = "StoreChat Demonstration"
                    />
                    <p>For the final project of CS180, I worked with a team of four others to create a full-stack messaging system with account creation and authentication, data storage via .txt files, 
                        and concurrent server-client communication. I was responsible for connecting the server and client as well as the user interface, and I learned a lot about the importance of scrumming, task-delegation and management, and deadlines in a project.
                    </p>

                    <p onClick={context.leftButton} className={styles.projectButtonLeft}>&lt;</p>
                    <p onClick={context.rightButton} className={styles.projectButtonRight}>&gt;</p>
                </div>
            )}
        </>
    )
}

export default Projects;