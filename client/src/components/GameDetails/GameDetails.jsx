import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getGameDetail } from '../../redux/actions';
import { Link, NavLink, useParams, useHistory } from 'react-router-dom';
import { deleteGame } from '../../redux/actions';
import s from './GameDetails.module.css';
// import editImage from '../img/****MODIFICAR****';


export default function GameDetails(/* { match } */game) {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams(); /* match.params; */
    const id = params.id;

    useEffect(() => {
        if (id) {
            dispatch(getGameDetail(id));
        };
        return () => {
            dispatch(getGameDetail());
        };
    }, [dispatch, id]);

    const GAME = useSelector(state => state.gameDetail)

    const { name, img, description, rating, released, genres, platforms, createdInDb } = !game.update ? GAME : game;

    function handleDelete() {
        if (window.confirm(`Do you want delete "${name}"?`)) {
            dispatch(deleteGame(id));
            history.push("/home");
        };
    };

    return (
        <div className={s.background_detail} >
            <div className={s.card_detail} >
                {
                    createdInDb && !game.update ?
                    <div>
                        <button onClick={() => handleDelete()} >
                            <b>DELETE</b>
                        </button>
                        <Link to={`/home/game/edit/${id}`}>
                            <img src={`${"editImage"}`} alt={`${name}`} />
                        </Link>
                    </div> :
                    <></>
                }
                <img src={`${img}`} alt={`${name}`} className={s.img_detail} />
                <h1 className={s.header_detail} >
                    <strong>{name}</strong>
                </h1>
                <div className={s.cardContent_detail} >
                    <p className={s.card_text_detail} >
                        <b>{`${parseFloat(String(rating)).toFixed(2)}`}</b>
                    </p>
                </div>
                <div className={s.cardContent_detail} >
                    <p className={s.card_text_detail} >
                        <b>{`${released}`}</b>
                    </p>
                </div>
                <div className={s.cardContent_detail} >
                    <p className={s.card_text_detail} >
                        <b>Generos:{genres?.reduce((text, genre) => text ? 
                            `${text} - ${genre}` : 
                            `${genre}`, "")}</b>
                    </p>
                </div>
                <div className={s.cardContent_detail} >
                    <p className={s.card_text_detail} >
                        <b>Plataformas:{platforms?.reduce((text, platform) => text ? 
                            `${text} - ${platform}` : 
                            `${platform}`, "")}</b>
                    </p>
                </div>
                <div className={s.cardContent_detail} >
                    <p className={s.card_text_detail} >{`${description}`}</p>
                </div>
                {
                    !game.update ?
                    <div className={s.cardContent_detail} >
                        <NavLink to="/home">
                            <button>
                                <b>Volver</b>
                            </button>
                        </NavLink>
                    </div> :
                    <></>
                }
            </div>
        </div>
    );
};