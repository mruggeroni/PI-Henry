import React from "react";
// import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { deleteGame } from '../../redux/actions';
// import editImage from '../../img/****MODIFICAR****';
import s from './GameCard.module.css';


export default function GameCard(props) {
    // const dispatch = useDispatch();

    // function handleDelete() {
    //     dispatch(deleteGame(props.id));
    // };

    return (
        <div className={s.card} >
            {
                props.createdInDb ?
                <div>
                    <button /* onClick={() => handleDelete()} */ >
                        <b>x</b>
                    </button>
                    <Link to={`/home/game/edit/${props.id}`}>
                        <img src={`${/* editImage */"img"}`} alt={`${props.name}`} />
                    </Link>
                </div> :
                <></>
            }
            <Link to={`/home/game/${props.id}`}>
                <img src={`${props.img}`} alt={`${props.name}`} className={s.img} />
                <h2 className={s.header} >
                    <em>{props.name}</em>
                </h2>
                <div className={s.cardContent} >
                    <p className={s.card_text} >
                        <b>{`${props.rating}`}</b>
                    </p>
                    <p className={s.card_text} >
                        <b>Generos: {
                            props.genres?.reduce((text, genre) => text + " " + genre, "")
                        }</b>
                    </p>
                </div>
            </Link>
        </div>
    );
};