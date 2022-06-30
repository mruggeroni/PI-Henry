import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getGameDetail } from '../redux/actions';
import { Link, NavLink } from 'react-router-dom';
// import { deleteGame } from '../redux/actions';
// import editImage from '../img/****MODIFICAR****';


export default function GameDetails({ id }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGameDetail(id));
    }, [dispatch, id]);

    const GAME = useSelector(state => state.gameDetail)

    return (
        <div>
            <button /* onClick={() => deleteGame(props.id)} */>
                <b>x</b>
            </button>
            <Link to={`/home/edit/${GAME.id}`}>
                <img src={`${/* editImage */"img"}`} alt={`${GAME.name}`} />
            </Link>
            <h2>
                <strong>{GAME.name}</strong>
            </h2>
            <div>
                <img src={`${GAME.img}`} alt={`${GAME.name}`} />
            </div>
            <p>
                <b>{`${GAME.rating}`}</b>
            </p>
            <p>
                <b>{`${GAME.released}`}</b>
            </p>
            <p>
                <b>Generos:{GAME.genres?.reduce((text, genre) => `${text} ${genre}`, "")}</b>
            </p>
            <p>
                <b>Plataformas:{GAME.platforms?.reduce((text, platform) => `${text} ${platform}`, "")}</b>
            </p>
            <p>{`${GAME.description}`}</p>
            <NavLink to="/videogames">
                <button>
                    <b>Volver</b>
                </button>
            </NavLink>
        </div>
    );
};