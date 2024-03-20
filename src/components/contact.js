import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Down from './down';
import ContactForm from './contactform';

const Contact = () => {

    return (
    <div className={`${styles.container} ${styles.contact}`} id = "Contact">
            <Down link="#Contact" color="black"/>
            <ContactForm/>
                <Image
                src = '/contact/fountain.jpg'
                width = {0}
                height = {0}
                loading = "lazy"
                style = {{objectFit: 'cover', zIndex: -1, height: '100%', width: '100%', position: 'absolute', bottom: 0, opacity: 0.5, filter: 'blur(4px)', transition: 'all 2s ease-in-out'}}
                sizes = "100vw"
                />
        <p className={styles.copyright}>Copyright © 2024 Daniel Tian. All rights reserved.</p>
    </div>
          )
}

export default Contact;