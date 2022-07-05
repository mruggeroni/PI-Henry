import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Prompt, useParams/* , useHistory */ } from "react-router-dom";
import { getGameDetail, getGenres, getPlatforms, postGame, putGame } from "../../redux/actions";
import GameDetails from '../GameDetails/GameDetails';
import imagenDefault from "../../img/videogame-default.jpg";


export default function GameCreation() {
    const dispatch = useDispatch();
    const params = useParams();
    // const history = useHistory();
    const id = params.id;

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlatforms());
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            dispatch(getGameDetail(id));
        };
    }, [dispatch, id]);

    const GENRES = useSelector(state => state.genres);
    const PLATFORMS = useSelector(state => state.platforms);
    const GAME_DETAIL = useSelector(state => state.gameDetail);

    const [input, setInput] = useState({
        name: id ? GAME_DETAIL.name : "", 
        img: id ? GAME_DETAIL.img : imagenDefault, 
        description: id ? GAME_DETAIL.description : "", 
        rating: id ? GAME_DETAIL.rating : 0, 
        released: id ? GAME_DETAIL.released : "",
        genres: id ? GAME_DETAIL.genres : [],
        platforms: id ? GAME_DETAIL.platforms : [],
    });
    let refImage = useRef("");

    const handleChange = (e) => {
        e.preventDefault();
        // console.log(refImage.current.value)
        // console.log(e.target.value, input.rating, e.target.type);
        if (e.target.name !== "genres" && e.target.name !== "platforms") {
            // if (e.target.name === "rating" && (typeof parseFloat(e.target.value) !== "number")) return;
            // if (e.target.name === "rating" && (e.target.value < 0 || 5 < e.target.value)) return;
            setInput({
                ...input,
                [e.target.name]: e.target.value,
            });
        } else {
            !input[e.target.name].includes(e.target.value) ?
            setInput({
                ...input,
                [e.target.name]: input[e.target.name].length < 10 ? [...input[e.target.name], e.target.value] : [...input[e.target.name]],
            }) :
            setInput({
                ...input,
                [e.target.name]: input[e.target.name].filter(element => element !== e.target.value),
            });
        };
    };
    const handleImageChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: refImage.current.value ? refImage.current.value : imagenDefault,
        });
    };
    const handleDeleteOption = (e) => {
        setInput({
            ...input,
            [e.target.name]: input[e.target.name].filter(element => element !== e.target.id),
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        id ? dispatch(putGame(id)) : dispatch(postGame(input));
        // setInput({
        //     name: id ? GAME_DETAIL.name : "", 
        //     img: id ? GAME_DETAIL.img : imagenDefault, 
        //     description: id ? GAME_DETAIL.description : "", 
        //     rating: id ? GAME_DETAIL.rating : 0, 
        //     released: id ? GAME_DETAIL.released : "",
        //     genres: id ? GAME_DETAIL.genres : [],
        //     platforms: id ? GAME_DETAIL.platforms : [],
        // });
        alert(id ? "successfully updated game" : "game created successfully");
        // history.push("/home");
    };


    return (
        <div>
            <h1>VideoGame Creation</h1>
            <div>
                <GameDetails 
                    name={input.name}
                    img={input.img} 
                    description={input.description}
                    rating={input.rating}
                    released={input.released}
                    genres={input.genres}
                    platforms={input.platforms}
                    createdInDb={true}
                    update={true}
            />
            </div>
            <div>
                <form onSubmit={(e) => handleSubmit(e)} >
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
                            onError={(e) => setInput({
                                ...input,

                            })}
                            onChange={(e) => handleImageChange(e)}
                        />
                        <div>
                            <img src={input.img === imagenDefault ? /* "#" */input.img : input.img} alt="preview_image" />
                        </div>
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
                    </div>
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
                        <div>
                            {
                                input.genres?.length ? 
                                input.genres?.map(genre => {
                                    return (
                                        <button 
                                            key={genre} 
                                            id={genre} 
                                            name="genres" 
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
                        <div>
                            {
                                input.platforms?.length ? 
                                input.platforms?.map(platform => {
                                    return (
                                        <button 
                                            key={platform} 
                                            id={platform} 
                                            name="platforms" 
                                            onClick={e => handleDeleteOption(e)} 
                                        >{platform}</button>
                                    )
                                }) : ""
                            }
                        </div>
                    </div>
                    <div>
                        <button 
                            type='submit' 
                            id="submit" 
                            name="submit"
                            disabled={(!input.name || !input.description || !input.rating || !input.released || !input.genres.length || !input.platforms.length)} 
                        >
                            <b>{id ? "update" : "Create"}</b>
                        </button>
                    </div>
                </form>
                <div>
                    <NavLink to='/home' >
                        <button 
                            id="cancel" 
                            name="cancel" 
                        >
                            <b>Cancel</b>
                        </button>
                    </NavLink>
                </div>
                <Prompt 
                    when={(e) => e.target.id === "cancel" /* || e.target.id === "submit" */} 
                    message={/* (e) => e.target.id === "cancel" ? "Are you sure leave to game cretion?" : `${id ? "Successfully game updated.\n" : "Successfully game created.\n"} */'Are you sure leave to game cretion?'/* ` */}
                />
            </div>
        </div>
    );
};