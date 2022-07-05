import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getGameDetail } from '../../redux/actions';
import { Link, NavLink, useParams, useHistory } from 'react-router-dom';
import { deleteGame } from '../../redux/actions';
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
    }, [dispatch, id]);

    const GAME = useSelector(state => state.gameDetail)

    const { name, img, description, rating, released, genres, platforms, createdInDb, update } = id ? GAME : game;

    function handleDelete() {
        dispatch(deleteGame(id));
        history.push("/home");
    };

    return (
        <div>
            {
                createdInDb && !update ?
                <div>
                    <button onClick={() => handleDelete()} >
                        <b>DELETE</b>
                    </button>
                    <Link to={`/home/game/edit/${id}`}>
                        <img src={`${/* editImage */"img"}`} alt={`${name}`} />
                    </Link>
                </div> :
                <></>
            }
            <div>
                <h1>
                    <strong>{name}</strong>
                </h1>
            </div>
            <div>
                <img src={`${img}`} alt={`${name}`} />
            </div>
            <div>
                <span>
                    <b>{`${rating}`}</b>
                </span>
            </div>
            <div>
                <span>
                    <b>{`${released}`}</b>
                </span>
            </div>
            <div>
                <span>
                    <b>Generos:{genres?.reduce((text, genre) => text ? 
                        `${text} - ${genre}` : 
                        `${genre}`, "")}</b>
                </span>
            </div>
            <div>
                <span>
                    <b>Plataformas:{platforms?.reduce((text, platform) => text ? 
                        `${text} - ${platform}` : 
                        `${platform}`, "")}</b>
                </span>
            </div>
            <div>
                <p>{`${description}`}</p>
            </div>
            {
                id ?
                <div>
                    <NavLink to="/home">
                        <button>
                            <b>Volver</b>
                        </button>
                    </NavLink>
                </div> :
                <></>
            }
        </div>
    );
};