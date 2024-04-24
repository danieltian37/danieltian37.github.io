import styles from '../styles/Loading.module.css';
import { useEffect, useState, useContext } from 'react';
import GlobalContext from '../context/globalcontext.js';

export default function LoadingIcon() {
    const [buffer, setBuffer] = useState(true)
    const { isLoaded, setIsLoaded } = useContext(GlobalContext);

    useEffect(() => {
        if (isLoaded) {
            setBuffer(false);
        }
    }, []);

    useEffect(() => {
        if (isLoaded) {
            const layout = document.querySelector(`.${styles.layout}`)
            const icon = document.querySelector(`.${styles.icon}`)
            console.log(layout, icon)
            if (isLoaded && layout && icon) {
                setTimeout(() => {
                    layout.classList.add(styles.fade)
                    icon.classList.add(styles.fade)

                    setTimeout(() => {
                        setBuffer(false);
                    }, 1000);
                }, 1000);
            }
        }
    }, [isLoaded]);
 
    return (
        <>
            {buffer && <div aria-live="polite" aria-busy={buffer} 
                className={styles.layout} id='layout'>
                <div className = {styles.icon} id = 'icon'>
                    <l-helix></l-helix>
                </div>
            </div>}
        </>
    );
}