import styles from '../styles/Loading.module.css';
import { useEffect, useState } from 'react';

export default function LoadingIcon({ isLoading }) {
    const [buffer, setBuffer] = useState(true)

    useEffect(() => {
        const layout = document.querySelector(`.${styles.layout}`)
        const icon = document.querySelector(`.${styles.icon}`)
        if (!isLoading && layout && icon) {
            layout.classList.add(styles.fade)
            icon.classList.add(styles.fade)

            setTimeout(() => {
                setBuffer(false);
            }, 1000);
        }
    }, [isLoading]);
 
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