import React, { useEffect, useState } from 'react';
import style from '../styles/Home.module.css';

const Fluid = require('../fluids/fluid')
let myFluid

const FluidSim = () => {
    useEffect(() => {
        const canvas = document.getElementById('renderSurface');
        myFluid = new Fluid(canvas);
        myFluid.activate();
    }, []);
    return (
        <div className={style.fluids}>
            <canvas id="renderSurface" style={{ width: '100vw', height: '120vh', margin: "0 0 0 0"}}></canvas>
        </div>
    )
}

export default FluidSim;

export { myFluid };