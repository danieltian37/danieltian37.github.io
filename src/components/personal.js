import React, { useState, useContext } from 'react';
import styles from '../styles/Home.module.css';
import GlobalContext from '../context/globalcontext';
import { ViewPager, Frame, Track, View } from 'react-view-pager'

const Personal = () => {

    return (
    <div className={`${styles.container} ${styles.personal}`} id = "Personal"> 
            <p className={styles.personaltitle}>Personal</p>
            <p className={styles.personalintro}>Passions & Pursuits!</p>
        
    </div>
    );
};

export default Personal;

const Carousel = () => {
    const [track, setTrack] = useState(null);
    return (
        <ViewPager tag="main">
            <Frame className="frame">
                <Track
                    ref={c => setTrack(c)}
                    viewsToShow={2}
                    infinite
                    className="track"
                >
                <View className="view">1</View>
                <View className="view">2</View>
                <View className="view">3</View>
                <View className="view">4</View>
                </Track>
            </Frame>
            <nav className="pager-controls">
                <a
                className="pager-control pager-control--prev"
                onClick={() => this.track.prev()}
                >
                Prev
                </a>
                <a
                className="pager-control pager-control--next"
                onClick={() => this.track.next()}
                >
                Next
                </a>
            </nav>
        </ViewPager>
    )
}