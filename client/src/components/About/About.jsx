import React, { useEffect, useRef } from "react";
import s from './About.module.css';
import video from '../../img/Black-Loop.mp4';
import image from '../../img/page_icon.jpg';


export default function About() {
    const vid = useRef();
    useEffect(() => {
        vid.current.play();
    });

    return (
        <div className={s.content_about} >
            <video key="video" id="video" ref={vid} src={video} type="video/mp4" autoplay muted loop poster={video} ></video>
            <div className={s.content_text_about} >
                <h1>About</h1>
                <p className={s.description_about} >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus odio officiis ea saepe commodi nobis ullam, dolores quibusdam! Pariatur, a voluptatem. Ullam, eligendi laborum! Dolor nostrum perferendis et cupiditate fuga!
                Neque autem perspiciatis cupiditate tenetur officiis at asperiores accusamus, dolorem ipsam quibusdam eum explicabo alias eaque vel animi nesciunt impedit quos culpa ad exercitationem. Quas eius blanditiis atque molestias iste.
                Vitae ad dolores hic et, consectetur provident voluptate consequuntur sequi earum quos modi ea. Quia earum placeat tempore quasi voluptate veniam soluta excepturi quos, voluptatibus cumque voluptatem rerum nostrum aliquid?
                Quas voluptas a iste, eaque ullam laborum veritatis quibusdam non amet error dignissimos repellat repudiandae velit ea suscipit voluptates aspernatur adipisci vero eum odio quod? Explicabo, deserunt debitis! Consequuntur, beatae.
                Neque consequuntur nulla blanditiis cum ea temporibus unde, voluptatem earum sequi. Magnam ipsum eius ut autem beatae totam voluptas dignissimos accusantium! Exercitationem nobis quod ab deserunt facere cumque eos neque.</p>
                <img className={s.image_about} src={image} alt="icon_image" />
            </div>
        </div>
    );
};