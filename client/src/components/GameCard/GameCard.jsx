import React from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteGame } from '../../redux/actions';
import s from './GameCard.module.css';
// import editImage from '../../img/****MODIFICAR****';


export default function GameCard(props) {
    const dispatch = useDispatch();

    function handleDelete() {
        if (window.confirm(`Do you want delete "${props.name}"?`)) {
            dispatch(deleteGame(props.id));
        };
    };

    return (
        <div className={s.card} >
            {
                props.createdInDb ?
                <div>
                    <button onClick={() => handleDelete()} >
                        <b>x</b>
                    </button>
                    {/* <Link to={`/home/game/edit/${props.id}`}>
                        <img src={`${"editImage"}`} alt={`${props.name}`} />
                    </Link> */}
                </div> :
                <></>
            }
            <NavLink to={`/home/game/${props.id}`} className={s.link} >
                <img src={`${props.img}`} alt={`${props.name}`} className={s.img} />
                <h2 className={s.header} >
                    <em>{props.name}</em>
                </h2>
                <div className={s.cardContent} >
                    <p className={s.card_text} >
                        <b>Generos: {
                            props.genres?.reduce((text, genre) => text + (text ? " - " : " ") + genre, "")
                        }</b>
                    </p>
                    <div className={s.card_rating} >
                        <p className={s.card_text} >
                            <b>{`${props.rating}`}</b>
                        </p>
                        <div>
                            <span 
                                className={Math.round(props.rating) >= 1 ? s.star_rating : ""} 
                            >★</span>
                            <span 
                                className={Math.round(props.rating) >= 2 ? s.star_rating : ""} 
                            >★</span>
                            <span 
                                className={Math.round(props.rating) >= 3 ? s.star_rating : ""} 
                            >★</span>
                            <span 
                                className={Math.round(props.rating) >= 4 ? s.star_rating : ""} 
                            >★</span>
                            <span 
                                className={Math.round(props.rating) === 5 ? s.star_rating : ""} 
                            >★</span>
                        </div>
                    </div>
                </div>
            </NavLink>
        </div>
    );
};