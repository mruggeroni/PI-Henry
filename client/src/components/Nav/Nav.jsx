import React from "react";
import { Link } from 'react-router-dom';
import s from './Nav.module.css';


export default function Nav() {
    return (
        <div className={s.nav} >
            <Link to="/home">Home</Link>
            <Link to="/home/about">About</Link>
            <Link to="/home/creategame">Crear Videojuego</Link>
        </div>
    );
};