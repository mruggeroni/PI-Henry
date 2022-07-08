import React from "react";
import loading from "../../img/loading.gif";
import s from './Loading.module.css';


export default function Loading() {
    return (
        <div className={s.loading} >
            <img src={loading} alt="loading" />
        </div>
    );
};