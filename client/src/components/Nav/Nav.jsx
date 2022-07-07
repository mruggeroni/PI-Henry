import React from "react";
import { NavLink } from 'react-router-dom';
import s from './Nav.module.css';


export default function Nav() {
    return (
        <div className={s.nav} >
            <NavLink className={s.link_nav} to="/home">Home</NavLink>
            <NavLink className={s.link_nav} to="/home/about">About</NavLink>
            <NavLink className={s.link_nav} to="/home/creategame">Crear Videojuego</NavLink>
        </div>
    );
};