import React, { useEffect, useRef } from "react";
import s from './About.module.css';
import video from '../../img/Black-Loop.mp4';


export default function About() {
    const vid = useRef();
    useEffect(() => {
        vid.current.play();
    });

    return (
        <div className={s.content_about} >
            <video key="video" id="video" ref={vid} src={video} type="video/mp4" autoplay muted loop poster={video} ></video>
            <div className={s.content_text_about} >
                <h1>SOBRE LA APP</h1>
                <p>descripcion de la App</p>
            </div>
        </div>
    );
};