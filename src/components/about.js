import React, { useEffect, useState, useRef } from 'react';
import styles from '../styles/Home.module.css';
import Faders from './faders.js';
import Image from 'next/image';
import Down from './down.js';

const About = () => {
    const [expOne, setExpOne] = useState(false);
    const [expTwo, setExpTwo] = useState(false);
    const [expThree, setExpThree] = useState(false);
    const [oneClicked, setOneClicked] = useState(false);
    const [twoClicked, setTwoClicked] = useState(false);
    const [threeClicked, setThreeClicked] = useState(false);

    const clickOne = () => {
        setOneClicked(true);

        setExpOne(true);
        setExpTwo(false);
        setExpThree(false);
        setTwoClicked(false);
        setThreeClicked(false);
    }
    const clickTwo = () => {
        setTwoClicked(true);

        setExpOne(false);
        setExpTwo(true);
        setExpThree(false);
        setOneClicked(false);
        setThreeClicked(false);
    }
    const clickThree = () => {
        setThreeClicked(true);

        setExpOne(false);
        setExpTwo(false);
        setExpThree(true);
        setOneClicked(false);
        setTwoClicked(false);
    }
    const container = useRef(null);


    useEffect(() => {
      const elements = document.querySelector(`.${styles.title}`);
      const first = document.querySelector(`.${styles.first}`);
      const aboutme = document.querySelector(`.${styles.aboutme}`);
      const width = document.documentElement.clientWidth;
      const box = document.querySelector(`.${styles.experiencebox}`);
      
      if (first && elements) {
        const handleIntersection = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    elements.classList.add(styles.show);
                    first.classList.add(styles.show);
                    aboutme.classList.add(styles.show);
                }
            });
        };
        const intersectionObserver = new IntersectionObserver(handleIntersection, {
            threshold: 0.01,
            // rootMargin: "-" + 0.2 * height + "px -" + 0.4 * width + "px -" + 0.2 * height + "px -" + 0.4 * width + "px",
            rootMargin: "0px -" + 0.4 * width + "px 0px -" + 0.4 * width + "px"
        });

        intersectionObserver.observe(first);

        return () => {
            intersectionObserver.unobserve(first);
        };
      }
    }, []);

    useEffect(() => {
        const box = document.querySelector(`.${styles.experiencebox}`);
        if (box) {
            const timeoutId = setTimeout(() => {
                box.classList.add(styles.show);
            }, 20);
        }

        const experiences = document.querySelector(`.${styles.aboutexperience}`);
        const about = document.querySelector(`.${styles.aboutme}`);
        const title = document.querySelector(`.${styles.title}`);
        const abouttitle = document.querySelector(`.${styles.abouttitle}`);

        document.addEventListener('mousedown', (event) => {
            if (event.target === about || event.target === title || event.target === experiences || event.target === abouttitle || event.target === container.current) {
                if (box) {
                    box.classList.remove(styles.show);
                    const timeoutId = setTimeout(() => {
                        setExpOne(false);
                        setExpTwo(false);
                        setExpThree(false);
                        setOneClicked(false);
                        setTwoClicked(false);
                        setThreeClicked(false);
                    }, 200);
                }
            }
        })
        
        const handleScroll = () => {
            if (box) {
                box.classList.remove(styles.show);
                const timeoutId = setTimeout(() => {
                    setExpOne(false);
                    setExpTwo(false);
                    setExpThree(false);
                    setOneClicked(false);
                    setTwoClicked(false);
                    setThreeClicked(false);
                }, 200);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', (event) => {
                if (event.target === about || event.target === title || event.target === experiences || event.target === abouttitle || container.contains(event.target)) {
                    if (box) {
                        box.classList.remove(styles.show);
                        const timeoutId = setTimeout(() => {
                            setExpOne(false);
                            setExpTwo(false);
                            setExpThree(false);
                        }, 200);
                    }
                }
            })
        };
    }, [expOne, expTwo, expThree])

    const handleMouseLeaveOne = () => {
        if (!oneClicked) {
            setExpOne(false);
        }
    }
    const handleMouseLeaveTwo = () => {
        if (!twoClicked) {
            setExpTwo(false);
        }
    }
    const handleMouseLeaveThree = () => {
        if (!threeClicked) {
            setExpThree(false);
        }
    }
    const handleClick = (e, link) => {
        e.preventDefault();
        const targetElement = document.querySelector(link);
        const offset = link == "#Experiences" ? -100 : 0;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetElement.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition + offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    };

    return (
    <>
        <div className={[styles.container, styles.first].join(" ")} id="About" ref={container}>
        <Down link="#About" color="white"/>
          <h1 className={styles.title}>
            <i>who am I?</i>
          </h1>
          <h1 className={styles.titlePlace}></h1>

          <h2 className={styles.aboutme}>
            I'm a junior @Purdue, full-stack developer<br></br>
            self-starter, people-lover, lifelong-learner, and hyphen-overuser.
            <br></br>
            <br></br>
            <i>I'm dedicated to creating value, impact, and meaning in people's lives. </i>
          </h2>
        <hr style={{width: "30rem", margin: "2rem 0 3rem 0"}} id="Experiences"></hr>
        <Faders>
          <div className= {styles.aboutexperience}>
            <div>
                <h2 className={styles.abouttitle}>check out my experiences</h2>
                <div className={styles.experiences}>
                    <p className= {styles.experiencetext}
                        onMouseEnter={() => {setExpOne(true)}}
                        onMouseLeave={handleMouseLeaveOne}
                        onClick={clickOne}>
                        <b>Envision Center</b><br></br>
                        Software Engineering Intern
                    </p>
                </div>
                <div className={styles.experiences}>
                    <p className= {styles.experiencetext}
                        onMouseEnter={() => {setExpTwo(true)}}
                        onMouseLeave={handleMouseLeaveTwo}
                        onClick={clickTwo}>
                        <b>Purdue University</b><br></br>
                        Lead Instructor
                    </p>
                </div>
                <div className={styles.experiences}>
                    <p className= {styles.experiencetext}
                        onMouseEnter={() => {setExpThree(true)}}
                        onMouseLeave={handleMouseLeaveThree}
                        onClick={clickThree}>
                        <b>Stanford University</b><br></br>
                        Machine Learning Research Intern
                    </p>
                </div>

            </div>

            <div>
                <h2 className={styles.abouttitle}>and what I've learned so far</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Languages</th>
                            <th>Technologies</th>
                            <th>Miscellaneous</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Java / Python / C++</td>
                        <td>React / Next.js /<br></br> React Native</td>
                        <td>Microsoft Certified in<br></br> Azure Fundamentals</td>
                    </tr>
                    <tr>
                        <td>JavaScript / HTML /<br></br> CSS</td>
                        <td>Node.js / Express /<br></br> MySQL / MongoDB</td>
                        <td>USACO Silver Division</td>
                    </tr>
                    <tr>
                        <td>SQL / R</td>
                        <td>sklearn / D3.js</td>
                        <td>Adobe Creative Cloud</td>
                    </tr>
                    </tbody>
                </table>
            </div>
          </div>
          {expOne && <ExperienceOne />}
          {expTwo && <ExperienceTwo />}
          {expThree && <ExperienceThree />}
        </Faders>


        </div>
    </>
        
    );
}

export default About;

const ExperienceTwo = () => {
    return (
        <>
            <div className = {styles.experiencebox}>
                <h2>August 2024 — Present</h2>
                <Image
                    src = "/cs193.png"
                    width = {0}
                    height = {0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto'}}
                    alt = "CS193"
                />
                <p className = {styles.experiencebullets}>
                    — Lectured 900+ first-year CS students while managing TA's, creating and teaching course materials covering Git, terminal, shell scripting, Linux \& Unix, LaTeX, and TCP/ICP
                    </p>
                <p className = {styles.experiencebullets}>
                    — Coordinated expansion to Purdue University Indianapolis (PUI), managing TA's/lecturers for 150+ enrolled
                    </p>
            </div>
        </>
    );
}
const ExperienceOne = () => {
    return (
        <>
            <div className = {styles.experiencebox}>
                <h2>May 2024 — Present</h2>
                <Image
                    src = "/flightprofilerdemo.gif"
                    width = {0}
                    height = {0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                    alt = "FlightProfiler 3D Weather Demo"
                />
                <p className = {styles.experiencebullets}>
                    — Developed 3D real-time weather visualization web application to enhance safety for general aviation pilots
                    </p>
                <p className = {styles.experiencebullets}>
                    — Optimized OpenGL graphics performance to handle simultaneous visualization of up to 30,000 data points by reducing rendering by levels of detail and culling non-essential data
                    </p>
                <p className = {styles.experiencebullets}>
                    — Spearheaded 3D Weather's FAA acquisition transition, ensuring efficient transfer of knowledge to new teams by managing database migration of AWS clusters and operational scripts
                </p>
                <p className = {styles.experiencebullets}>
                    — Enhanced storage, distribution, and scalability to accommodate increased usage following FAA acquisition by leveraging AWS tools including S3, CloudFront, EC2
                </p>
            </div>
        </>
    );
}
const ExperienceThree = () => {
    return (
        <>
            <div className = {styles.experiencebox}>
                <h2>January 2024 — August 2024</h2>
                <Image
                    src = "/SDSS.png"
                    width = {0}
                    height = {0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                    alt = "SDSS Logo"
                />
                <p className = {styles.experiencebullets}>
                    — Reduced data requirements by 35\% for ConvLSTM model by identifying optimal data levels and processing configurations, achieving efficient insights into lightning activity, spatial distributions, and temporal variations
                </p>
                <p className = {styles.experiencebullets}>
                    — Standardized model analysis data preprocessing by implementing hierarchical data structuring and extraction
                </p>
            </div>
        </>
    );
}