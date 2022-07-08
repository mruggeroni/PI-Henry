import React from "react";
import { NavLink } from 'react-router-dom';
import s from './Nav.module.css';
import icon from '../../img/page_icon.jpg';


export default function Nav() {
    return (
        <div className={s.nav} >
            <img className={s.icon_nav} src={icon} alt="icon" />
            <NavLink className={s.link_nav} to="/home">Home</NavLink>
            <NavLink className={s.link_nav} to="/home/about">About</NavLink>
            <NavLink className={s.link_nav} to="/home/creategame">Crear Videojuego</NavLink>
        </div>
    );
};