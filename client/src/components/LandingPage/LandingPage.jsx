import React from "react";
import { Link } from 'react-router-dom';
import s from './LandingPage.module.css';


export default function LandingPage() {
    return (
        <div className={s.landingPage} >
            <h1 className={s.landingPageTitle} >Videogame App</h1>
            <Link to="/home" >
                <button className={`${s.landingPageButton} ${s.icon3d}`} >
                    <span>Start</span>
                </button>
            </Link>
        </div>
    );
};