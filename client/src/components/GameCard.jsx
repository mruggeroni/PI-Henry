import React from "react";
import { Link } from 'react-router-dom';
// import { deleteGame } from '../redux/actions';
// import editImage from '../img/****MODIFICAR****';


export default function GameCard(props) {
    return (
        <div>
            <button /* onClick={() => deleteGame(props.id)} */>
                <b>x</b>
            </button>
            <Link to={`/home/edit/${props.id}`}>
                <img src={`${/* editImage */"img"}`} alt={`${props.name}`} />
            </Link>
            <Link to={`/home/game/${props.id}`}>
                <h3>
                    <em>{props.name}</em>
                </h3>
                <div>
                    <img src={`${props.img}`} alt={`${props.name}`} />
                </div>
            </Link>
            <p>
                <b>{`${props.rating}`}</b>
            </p>
            <p>
                <b>Generos: {
                    props.genres?.reduce((text, genre) => text + " " + genre, "")
                }</b>
            </p>
        </div>
    );
};