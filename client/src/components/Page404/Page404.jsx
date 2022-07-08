import React from "react";
import page404Image from "../../img/page-404.gif";
import s from './Page404.module.css'


export default function Page404() {
    return (
        <div className={s.page404} >
            <img src={page404Image} alt="page 404" />
        </div>
    );
};