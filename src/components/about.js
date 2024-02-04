import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Faders from '../components/faders.js';
import Image from 'next/image';

const Experience = () => {
    return (
        <>
            <div className = {styles.experiencebox}>
                <h2>November 2023 — Present</h2>
                <Image
                    src = "/KnowledgeBase.png"
                    width = {0}
                    height = {0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                    alt = "Picture of WebDecide"
                />
            </div>
        </>
    );
}

const About = () => {
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
      const elements = document.querySelector(`.${styles.title}`);
      const first = document.querySelector(`.${styles.first}`);
      const aboutme = document.querySelector(`.${styles.aboutme}`);
      const height = document.documentElement.clientHeight;
      const width = document.documentElement.clientWidth;
      if (first && elements) {
        const handleIntersection = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log("not here")
                    elements.classList.add(styles.show);
                    first.classList.add(styles.show);
                    aboutme.classList.add(styles.show);
                } else {
                    console.log("here")
                    elements.classList.remove(styles.show);
                    first.classList.remove(styles.show);
                    aboutme.classList.remove(styles.show);
                }
            });
        };
        const intersectionObserver = new IntersectionObserver(handleIntersection, {
            threshold: 0.03,
            // rootMargin: "-" + 0.2 * height + "px -" + 0.4 * width + "px -" + 0.2 * height + "px -" + 0.4 * width + "px",
            rootMargin: "0px -" + 0.4 * width + "px 0px -" + 0.4 * width + "px"
        });

        intersectionObserver.observe(first);

        return () => {
            intersectionObserver.unobserve(first);
        };
      }
    }, []);

    return (
        <div className={[styles.container, styles.first].join(" ")} id="About"> 
          <h1 className={styles.title}>
            Who am I?
          </h1>

          <h2 className={styles.aboutme}>
            First-year sophomore @Purdue (2026), front-end & full-stack <br></br>developer,
             self-starter, people-lover, lifelong-learner, and hyphen-overuser.
          </h2>
        <Faders>
          <div className= {styles.aboutexperience}>
            <div>
                <h2 className={styles.abouttitle}>Experience</h2>
                <div className={styles.experiences}>
                    <p className= {styles.experiencetext}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}>
                        <b>Human-Centered Software Systems Lab</b><br></br>
                        Undergraduate Research Assistant
                    </p>
                </div>
                <div className={styles.experiences}>
                    <p className= {styles.experiencetext}>
                        <b>AstraZeneca</b><br></br>
                        App Development, The Data Mine Corporate Partners
                    </p>
                </div>
                <div className={styles.experiences}>
                    <p className= {styles.experiencetext}>
                        <b>IU Luddy School of Informatics</b><br></br>
                        Undergraduate Research Assistant
                    </p>
                </div>

            </div>

            <div>
                <h2 className={styles.abouttitle}>Skills & Certificates</h2>
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
                        <td>React / Next.js/<br></br> React Native</td>
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
          {isHovering && <Experience />}
            {/* <div>
                <div>
                    <a href="https://drive.google.com/file/d/1qj5Lc4Xw3Z9q3wvYw2Q9m2s4u4aLhX6B/view?usp=sharing" target="_blank"
                        className= {styles.resumebutton}>
                        download my résumé
                    </a>
                </div>
            </div> */}
        </Faders>



        </div>
        
    );
}

export default About;