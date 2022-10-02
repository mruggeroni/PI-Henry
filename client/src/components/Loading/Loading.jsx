import React from "react";
import s from './Loading.module.css';
// import loading from "../../img/loading.gif";


export default function Loading() {
    const loading = "https://res.cloudinary.com/dkf1okbsr/image/upload/v1663212308/PI/loading_uqgsur.gif";
    
    return (
        <div className={s.loadingDiv} >
            <img src={loading} alt="loading" className={s.loading} />
        </div>
    );
};