import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Faders from "../components/faders.js";
import Nodes from "../components/nodes.js";
import Intro from "../components/intro.js";
import About from "../components/about.js";
import Projects from "../components/projects.js";
import { useRef, useState, useEffect } from 'react';
import { GlobalContextProvider } from '../context/globalcontext';
import FluidSim from '../components/fluidsim';
import Personal from '../components/personal';
import Script from 'next/script';
import Down from '../components/down.js';
import Contact from '../components/contact.js';
import RootLayout from '../components/rootlayout.js';
import LoadingIcon from '../components/loading.js';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating an asynchronous operation, like fetching data
    setTimeout(() => {
      // Once the operation is complete, set isLoading to false
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <RootLayout>
      <GlobalContextProvider>
        <LoadingIcon isLoading={isLoading} />
        <div className={styles.container}>
          <Head>
            <title>Daniel Tian</title>
            <link rel="icon" href="https://i.ibb.co/SBjYMzp/Screenshot-2024-02-24-at-6-16-22-PM-modified.png" />
            <link href="./styles/global.css" rel="stylesheet"></link>
          </Head>

          <Intro/>

          <main>
            <About/>

            <div className={`${styles.container} ${styles.projects}`} id="Projects">
              <Down link="#Projects" color="black"/>
              <p className={styles.projectTitle}><i>Personal Portfolio</i></p>
              <p className={styles.projectIntro}>Play with my projects!</p>
              <div className={styles.rotate}>
                    <Nodes/>
              </div>
              <FluidSim/>
              <Script src="https://cdn.jsdelivr.net/npm/fluid-canvas@latest"/>
              <Projects/> 
            </div>

            <Personal/>

            

            <Contact/>
          </main>


          <style jsx>{`
            main {
              margin: 5rem 0 0 0;
              padding: 0 0 0 0;
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
            footer {
              width: 100%;
              height: 100px;
              border-top: 1px solid #eaeaea;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            footer img {
              margin-left: 0.5rem;
            }
            footer a {
              display: flex;
              justify-content: center;
              align-items: center;
              text-decoration: none;
              color: inherit;
            }
            code {
              background: #fafafa;
              border-radius: 5px;
              padding: 0.75rem;
              font-size: 1.1rem;
              font-family:
                Menlo,
                Monaco,
                Lucida Console,
                Liberation Mono,
                DejaVu Sans Mono,
                Bitstream Vera Sans Mono,
                Courier New,
                monospace;
            }
          `}</style>

          <style jsx global>{`
            html,
            body {
              padding: 0;
              margin: 0;
              font-family:
                -apple-system,
                BlinkMacSystemFont,
                Segoe UI,
                Roboto,
                Oxygen,
                Ubuntu,
                Cantarell,
                Fira Sans,
                Droid Sans,
                Helvetica Neue,
                sans-serif;
              background-color: #28282B;
              color: #DADBDD;
              scroll-behavior: smooth;
            }

          `}</style>
        </div>
      </GlobalContextProvider>
    </RootLayout>
  );
}
