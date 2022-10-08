import React, { useEffect, useRef } from "react";
import s from './About.module.css';
// import video from '../../img/Black-Loop.mp4';
// import image from '../../img/page_icon.jpg';


export default function About() {
    const video = "https://res.cloudinary.com/dkf1okbsr/video/upload/v1663212309/PI/Black-Loop_r4166h.mp4";
    const image = "https://res.cloudinary.com/dkf1okbsr/image/upload/v1663212306/PI/page_icon_ocrogz.jpg";
    
    const vid = useRef();
    useEffect(() => {
        vid.current.play();
    });

    return (
        <div className={s.content_about} >
            <video 
                className={s.video_about}
                key="video" 
                id="video" 
                ref={vid} 
                src={video} 
                type="video/mp4" 
                autoplay 
                muted 
                loop 
                preload="metadata"
            ></video>
            <div className={s.content_text_about} >
                <h1>About</h1>
                <div className={s.description_about} >
                    <h2><b>Objectives</b></h2>
                    <p>
                        Create an application where you can display game data, filter by properties, search and interact with a database / API.
                        <br></br>
                        The database was connected to the <a href="https://rawg.io/apidocs" >rawg</a> game external API.
                    </p>
                    <h2><b>Technologies</b></h2>
                    <ul>
                        <li>JavaScript</li>
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>SQL</li>
                        <li>React.js</li>
                        <li>Redux</li>
                        <li>Node.js</li>
                        <li>Express.js</li>
                        <li>SequelizeORM</li>
                        <li>PostgreSQL</li>
                        <li>Git</li>
                        <li>DotEnv</li>
                        <li>Axios</li>
                        <li>Postman</li>
                    </ul>
                    <h2><b>Used Knowledges</b></h2>
                    <ul>
                        <li>HTTP request.</li>
                        <li>REST API construction.</li>
                        <li>CRUD (create, read, update and delete).</li>
                        <li>Construction of relational database with postgreSQL.</li>
                        <li>Join the server to the database with sequelize ORM.</li>
                        <li>Join the server to the external API (with API key authentication) with sequelize ORM.</li>
                        <li>Back-end validations.</li>
                        <li>Use of terminal / Console.</li>
                        <li>Error management.</li>
                        <li>Test of rutes with postman.</li>
                        <li>Carry out documentation of rutes with postman.</li>
                        <li>Asynchronous request.</li>
                        <li>DOM manipulation.</li>
                        <li>Componentization principle.</li>
                        <li>Management of global and local states.</li>
                        <li>Component life cycle.</li>
                        <li>Front-end validations.</li>
                        <li>Controlled forms.</li>
                        <li>Global and module styles.</li>
                        <li>Styles and effects with pure CSS3.</li>
                        <li>Good practices with HTML5 and ES6.</li>
                        <li>Functional programming.</li>
                        <li>Declarative programming.</li>
                        <li>Documentations learning.</li>
                    </ul>
                </div>
                <img className={s.image_about} src={image} alt="icon_image" />
            </div>
        </div>
    );
};