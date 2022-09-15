import React from "react";
import s from './Page404.module.css'
// import page404Image from "../../img/page-404.gif";


export default function Page404() {
    const page404Image = "https://res.cloudinary.com/dkf1okbsr/image/upload/v1663212306/PI/page-404_ue0ukn.gif";

    return (
        <div className={s.page404} >
            <img src={page404Image} alt="page 404" />
        </div>
    );
};