import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getGameDetail } from '../../redux/actions';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { deleteGame } from '../../redux/actions';
import Loading from "../Loading/Loading";
import s from './GameDetails.module.css';
// import editImage from '../../img/edit.png';
// import deleteImage from '../../img/delete.png';


export default function GameDetails(/* { match } */game) {
    const editImage = "https://res.cloudinary.com/dkf1okbsr/image/upload/v1663212305/PI/edit_qt8bpv.png";
    const deleteImage = "https://res.cloudinary.com/dkf1okbsr/image/upload/v1663212306/PI/delete_qmp3hl.png";
    
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
            {
                GAME ?
                <div className={s.card_detail} >
                    {
                        createdInDb && !game.update ?
                        <div className={s.buttons_detail} >
                            <NavLink className={s.link_detail} to={`/home/game/edit/${id}`}>
                                <img className={s.image_button} src={editImage} alt={`${name}`} />
                            </NavLink>
                            <input onClick={() => handleDelete()} className={s.image_button} type="image" src={deleteImage} alt="edit" />
                        </div> :
                        <></>
                    }
                    <img src={`${img}`} alt={`${name}`} className={s.img_detail} />
                    <div className={s.rating_released} >
                        <div className={`${s.cardContent_detail} ${s.card_rating_detail}`} >
                            <p className={`${s.card_text_detail} ${s.rating_number_detail}`} >
                                <b>{`${parseFloat(String(rating)).toFixed(2)}`}</b>
                            </p>
                            <div className={s.stars} >
                                <span 
                                    className={Math.round(rating) >= 1 ? s.star_rating_detail : ""} 
                                >★</span>
                                <span 
                                    className={Math.round(rating) >= 2 ? s.star_rating_detail : ""} 
                                >★</span>
                                <span 
                                    className={Math.round(rating) >= 3 ? s.star_rating_detail : ""} 
                                >★</span>
                                <span 
                                    className={Math.round(rating) >= 4 ? s.star_rating_detail : ""} 
                                >★</span>
                                <span 
                                    className={Math.round(rating) === 5 ? s.star_rating_detail : ""} 
                                >★</span>
                            </div>
                        </div>
                        <div className={s.cardContent_detail} >
                            <p className={s.card_text_detail} >
                                <b>{`${released}`}</b>
                            </p>
                        </div>
                    </div>
                    <h1 className={s.header_detail} >
                        <strong>{name}</strong>
                    </h1>
                    <div className={`${s.cardContent_detail} ${s.card_description}`} >
                        <p className={s.card_text_detail} >{`${description}`}</p>
                    </div>
                    <div className={s.cardContent_detail} >
                        <p className={s.card_text_detail} >
                            <b>Genres:</b>{"   " + genres?.reduce((text, genre) => text ? 
                                `${text} - ${genre}` : 
                                `${genre}`, "")}
                        </p>
                    </div>
                    <div className={`${s.cardContent_detail} ${s.text_end}`} >
                        <p className={s.card_text_detail} >
                            <b>Platforms:</b>{"   " + platforms?.reduce((text, platform) => text ? 
                                `${text} - ${platform}` : 
                                `${platform}`, "")}
                        </p>
                    </div>
                    {
                        /* !game.update ?
                        <div className={s.cardContent_detail} >
                            <NavLink to="/home">
                                <button>
                                    <b>Volver</b>
                                </button>
                            </NavLink>
                        </div> :
                        <></> */
                    }
                </div> :
                <Loading />
            }
        </div>
    );
};