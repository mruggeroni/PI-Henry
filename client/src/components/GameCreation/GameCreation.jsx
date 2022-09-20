import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Prompt, useParams, useHistory } from "react-router-dom";
import { getGameDetail, getGames, getGenres, getPlatforms, postGame, putGame } from "../../redux/actions";
import GameDetails from '../GameDetails/GameDetails';
import s from './GameCreation.module.css';
// import submit from '../../img/joystick.png';
// import cancel from '../../img/joystick v2.png';


function validation(input, GAMES, oldName /* ,errors ,e */) {
    const ERRORS = {};  // se puede inicializar en {...errors}, borrar el error viejo para ese e.target.name, y acto seguido envolver los if por tipo de input
// name validate
    if (!input.name) {
        ERRORS.name = 'Name is required.';

    } else if (input.name.length < 3 || 25 < input.name.length) {
        ERRORS.name = 'Name must be 3 to 25 characters length.';

    } else if (GAMES?.findIndex(game => (input.name === game.name) && (input.name !== oldName)) >= 0) {
        ERRORS.name = 'Name already exists. This must be unique.';
    };

// image validate
    // if (/^https:\/\/\S+$/.test(input.img)) {
    //     ERRORS.img = 'The image must be a URL rute.';
    // };

// description validate
    if (!input.description) {
        ERRORS.description = 'Description is required.';

    } else if (input.description.length < 10 || 500 < input.description.length) {
        ERRORS.description = 'Description must be 10 to 500 characters length.';
    };

// released validate
    if (!input.released) {
        ERRORS.released = 'Released is required.';
    }; 

// rating validate
    if (!input.rating) {
        ERRORS.rating = 'Rating is required.';

    } else if (input.rating < 0 || 5 < input.rating) {
        ERRORS.rating = 'Rating value must be between 0 and 5 inclusive.';
    };

// genres validate
    if (!input.genres.length || 5 < input.genres.length) {
        ERRORS.genres = 'It must contain at least one genre (5 maximum).';
    };

// platforms validate
    if (!input.platforms.length || 5 < input.platforms.length) {
        ERRORS.platforms = 'It must contain at least one platform (5 maximum).';
    };
    return ERRORS;
};



export default function GameCreation() {
    const submit = "https://res.cloudinary.com/dkf1okbsr/image/upload/v1663212305/PI/joystick_sgjsdm.png";
    const cancel = "https://res.cloudinary.com/dkf1okbsr/image/upload/v1663212305/PI/joystick_v2_rw98tp.png";
    const imagenDefault = "https://res.cloudinary.com/dkf1okbsr/image/upload/v1663212307/PI/videogame-default_zrt3xm.jpg";

    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();
    const id = params.id;

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlatforms());
        dispatch(getGames());
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            dispatch(getGameDetail(id));
        };
    }, [dispatch, id]);

    const GENRES = useSelector(state => state.genres);
    const PLATFORMS = useSelector(state => state.platforms);
    const GAME_DETAIL = useSelector(state => state.gameDetail);
    const GAMES = useSelector(state => state.games);

    const { name, img, description, rating, released, genres, platforms } = GAME_DETAIL;

    const [input, setInput] = useState({
        name: id ? name : "", 
        img: id && img ? img : imagenDefault, 
        description: id ? description : "", 
        rating: id ? rating : 0, 
        released: id ? released : "",
        genres: id && genres ? genres : [],
        platforms: id && platforms ? platforms : [],
    });

    useEffect(() => {
        if (id) {
            setInput({
                name: id ? name : "", 
                img: id && img ? img : imagenDefault, 
                description: id ? description : "", 
                rating: id ? rating : 0, 
                released: id ? released : "",
                genres: id && genres ? genres : [],
                platforms: id && platforms ? platforms : [],
            });
        };
    }, [id, name, img, description, rating, released, genres, platforms]);

    const [errors, setErrors] = useState({});

    let refImage = useRef("");

    const handleDeleteOption = (e) => {
        let newInput = {
            ...input,
            [e.target.name]: input[e.target.name].filter(element => element !== e.target.id),
        };
        setInput(newInput);
        setErrors(validation(newInput, GAMES, GAME_DETAIL.name));
    };
    const handleChange = (e) => {
        e.preventDefault();
        let newInput = input;
        switch (e.target.name) {
            case 'name':
            case 'description':
            case 'released':
            case 'rating':
                newInput = {
                    ...input,
                    [e.target.name]: e.target.value,
                };
                break;
            case 'img':
                newInput = {
                    ...input,
                    [e.target.name]: refImage.current.value ? 
                        refImage.current.value : 
                        imagenDefault,
                };
                break;
            case 'genres':
            case 'platforms':
                !input[e.target.name].includes(e.target.value) ?
                newInput = {
                    ...input,
                    [e.target.name]: input[e.target.name].length < 5 ? 
                        [...input[e.target.name], e.target.value] : 
                        [...input[e.target.name]],
                } :
                newInput = {
                    ...input,
                    [e.target.name]: input[e.target.name].filter(element => element !== e.target.value),
                };
                break;
            default:
                break;
        }
        setInput(newInput);  // se iniciliza una varible "newInput" con el input nuevo y luego se realiza el setInput(newInput). El setInput(input) al llevar tiempo, puede renderizar el error viejo al entrar antes a la funcion validadora.
        setErrors(validation(newInput, GAMES, GAME_DETAIL.name));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validation(input, GAMES, GAME_DETAIL.name));
        id ? dispatch(putGame({...input, id})) : dispatch(postGame(input));
        setInput({
            name: id ? GAME_DETAIL.name : "", 
            img: id ? GAME_DETAIL.img : imagenDefault, 
            description: id ? GAME_DETAIL.description : "", 
            rating: id ? GAME_DETAIL.rating : 0, 
            released: id ? GAME_DETAIL.released : "",
            genres: id ? GAME_DETAIL.genres : [],
            platforms: id ? GAME_DETAIL.platforms : [],
        });
        const MESSAGE = id ? "Successfully updated game." : "Game created successfully."
        if (window.confirm(`${MESSAGE} Do you want go to home?`)) {
            history.push("/home");
        };
    };


    return ( 
        <div className={s.content_creation} >
            <div className={s.detail_creation} >
                <GameDetails 
                    name={input.name}
                    img={input.img} 
                    description={input.description}
                    rating={input.rating}
                    released={input.released}
                    genres={input.genres}
                    platforms={input.platforms}
                    createdInDb={true}
                    form={true}
                />
            </div>
            <div className={s.card_creation} >
                <form /* onSubmit={(e) => handleSubmit(e)} */ >
                    <div>
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            key="name"
                            id="name"
                            name="name" 
                            title="name of the new videogame"
                            placeholder="My new VideoGame"
                            minLength={5}
                            maxLength={20}
                            value={input.name} 
                            onChange={(e) => handleChange(e)}
                        />
                        {
                            errors.name ?
                            <p className={s.errors} >{errors.name}</p> :
                            <></>
                        }
                    </div>
                    <div>
                        <label htmlFor="img">Image</label>
                        <input 
                            type="text"/* "file" */ 
                            key="img"
                            id="img"
                            name="img" 
                            title="add main image to the new videogame"
                            placeholder="https://file.jpg"
                            /* accept=".jpg,.png,.svg" */
                            ref={refImage}
                            /* value={input.img} */ 
                            onChange={(e) => handleChange(e)}
                        />
                        <img 
                            className={s.img_creation}
                            src={input.img} 
                            alt="preview_image" 
                            onError={(e) => {
                                setErrors({
                                    ...errors,
                                    img: 'Image is not rendering.',
                                });
                                setInput({
                                    ...input,
                                    img: imagenDefault,
                                });
                            } /* tambien se puede pasar un e.target.id al validate, creando alli otro caso para este error*/}
                        />
                        {
                            errors.img ?
                            <p className={s.image_error} >{errors.img}</p> :
                            <></>
                        }
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea 
                            key="description"
                            id="description"
                            name="description" 
                            title="description of the new videogame"
                            placeholder="Description"
                            maxLength={500}
                            value={input.description} 
                            onChange={(e) => handleChange(e)}
                        />
                        {
                            errors.description ?
                            <p className={s.errors} >{errors.description}</p> :
                            <></>
                        }
                    </div>
                    <div>
                        <label htmlFor="rating">Rating</label>
                        <input 
                            type="range" 
                            key="ratingR"
                            id="ratingR"
                            name="rating" 
                            title="rating of the new videogame"
                            min={0}
                            max={5}
                            step={0.01}
                            value={input.rating} 
                            onChange={(e) => handleChange(e)}
                        />
                        <input 
                            type="number" 
                            key="ratingN"
                            id="ratingN"
                            name="rating" 
                            title="rating of the new videogame"
                            min={0}
                            max={5}
                            step={0.01}
                            value={parseFloat(String(input.rating)).toFixed(2)} 
                            onChange={(e) => handleChange(e)}
                        />
                        {
                            errors.rating ?
                            <p className={s.errors} >{errors.rating}</p> :
                            <></>
                        }
                    </div>
                    <div>
                        <label htmlFor="released">Released</label>
                        <input 
                            type="date" 
                            key="released"
                            id="released"
                            name="released" 
                            title="released of the new videogame"
                            value={input.released} 
                            onChange={(e) => handleChange(e)}
                        />
                        {
                            errors.released ?
                            <p className={s.errors} >{errors.released}</p> :
                            <></>
                        }
                    </div>
                    <div className={s.content_creation} >
                        <div>
                            <label htmlFor="genres">Genres</label>
                            <select 
                                key="genres"
                                id="genres"
                                name="genres"
                                title="add generes" 
                                size={10}
                                multiple 
                                onChange={(e) => handleChange(e)} 
                            >
                                {
                                    GENRES?.map(genre => {
                                        return (
                                            <option 
                                                key={genre} 
                                                id={genre}
                                                value={`${genre}`}
                                            >{genre}</option>
                                        )
                                    })
                                }
                            </select>
                            {
                                errors.genres ?
                                <p className={s.errors} >{errors.genres}</p> :
                                <></>
                            }
                            <div>
                                {
                                    input.genres?.length ? 
                                    input.genres?.map(genre => {
                                        return (
                                            <button 
                                                key={genre} 
                                                id={genre} 
                                                name="genres" 
                                                className={s.options_buttons}
                                                onClick={e => handleDeleteOption(e)} 
                                            >{genre}</button>
                                        )
                                    }) : ""
                                }
                            </div>
                        </div>
                        <div>
                            <label htmlFor="platforms">Platforms</label>
                            <select 
                                key="platforms"
                                id="platforms"
                                name="platforms"
                                title="add platforms" 
                                size={10}
                                multiple 
                                onChange={(e) => handleChange(e)} 
                            >
                                {
                                    PLATFORMS?.map(platform => {
                                        return (
                                            <option 
                                                key={platform} 
                                                id={platform}
                                                value={`${platform}`}
                                            >{platform}</option>
                                        )
                                    })
                                }
                            </select>
                            {
                                errors.platforms ?
                                <p className={s.errors} >{errors.platforms}</p> :
                                <></>
                            }
                            <div>
                                {
                                    input.platforms?.length ? 
                                    input.platforms?.map(platform => {
                                        return (
                                            <button 
                                                key={platform} 
                                                id={platform} 
                                                name="platforms" 
                                                className={s.options_buttons}
                                                onClick={e => handleDeleteOption(e)} 
                                            >{platform}</button>
                                        )
                                    }) : ""
                                }
                            </div>
                        </div>
                    </div>
                    <div className={s.submit_cancel} >
                        <input 
                            id="submit" 
                            name="submit"
                            title="Submit"
                            type="image" 
                            className={`${s.buttons_creation} ${s.submit_creation}`}
                            onClick={(e) => handleSubmit(e)}
                            disabled={Object.keys(errors)?.filter(e => e !== "img").length || (Object.keys(input)?.length !== 7 || !input.genres?.length || !input.platforms?.length)} 
                            src={submit} 
                            alt={id ? "update" : "Create"} 
                        />
                        <NavLink to='/home' >
                            <input 
                                id="cancel" 
                                name="cancel"
                                title="Cancel" 
                                type="image" 
                                className={`${s.buttons_creation} ${s.cancel_creation}`}
                                src={cancel} 
                                alt="cancel" 
                            />
                        </NavLink>
                        {/* <button 
                            type='submit' 
                            id="submit" 
                            name="submit"
                            disabled={Object.keys(errors).length || !input.name || !input.description || !input.released || !input.rating || !input.genres.length || !input.platforms.length} 
                        >
                            <b>{id ? "update" : "Create"}</b>
                        </button>
                        <button 
                            id="cancel" 
                            name="cancel" 
                        >
                            <b>Cancel</b>
                        </button> */}
                    </div>
                </form>
                <Prompt 
                    message='Are you sure to go?'
                />
            </div>
        </div>
    );
};