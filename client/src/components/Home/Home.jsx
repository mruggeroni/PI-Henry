import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { getGames,  getGamesFound,   getGenres/* , getPlatforms */, filtersAndSorts } from "../../redux/actions";
// import { Origin_Filter, Genre_Filter, Sort } from "../redux/reducer";
import FiltersAndSorts from "../FiltersAndSorts/FiltersAndSorts";
import GameCard from "../GameCard/GameCard";
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading";
import s from './Home.module.css';
// import video from '../../img/Black-Loop.mp4';


export default function Home() {
    const video = "https://res.cloudinary.com/dkf1okbsr/video/upload/v1663212309/PI/Black-Loop_r4166h.mp4";
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGames());
        dispatch(getGenres());
        // dispatch(getPlatforms());
    }, [dispatch]);

    const GAMES = useSelector(state => state.games);
    const GENRES = useSelector(state => state.genres);

    const [orden, setOrden] = useState("none");
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage/* , setGamesPerPage */] = useState(15);
    const [name, setName] = useState("");

    const indexOfFirstGame = (currentPage - 1) * gamesPerPage,
        indexOfLastGame = (currentPage) * gamesPerPage,
        currentGames = GAMES.slice(indexOfFirstGame, indexOfLastGame);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleFilterSortChanges = (e) => {
        if (e.target.id === "Sort" || orden !== "none") e.preventDefault();
        dispatch(filtersAndSorts({
            e_target_id: e.target.id, 
            e_target_value: e.target.value,
        }));
        e.target.id === "Sort" ? setOrden(e.target.value) : setOrden(orden);
        setCurrentPage(1);
    };

    const O_F = useRef(""),
        G_F = useRef(""),
        S = useRef(""),
        vid1 = useRef(),
        vid2 = useRef();
        // vid3 = useRef(),
        // vid4 = useRef();
    
    useEffect(() => {
        vid1.current.play();
        vid2.current.play();
        // vid3.current.play();
        // vid4.current.play();
    });

    function handleSubmitSearch(e) {
        e.preventDefault();
        dispatch(getGamesFound(name));
        O_F.current.value = "All";  // document.getElementById(Origin_Filter).value = "All";
        G_F.current.value = "All";  // document.getElementById(Genre_Filter).value = "All";
        S.current.value = "none";  // document.getElementById(Sort).value = "none";
        setCurrentPage(1);
    };
    function handleInputSearchChange(e) {
        e.preventDefault();
        setName(e.target.value)
    };
    function handleLeaveSearch(e) {
        dispatch(getGames());
        O_F.current.value = "All";
        G_F.current.value = "All";
        S.current.value = "none";
        setName("");
        setCurrentPage(1);
    };

    return (
        <div className={s.home} >
            <video 
                key="video1" 
                id="video1" 
                src={video} 
                type="video/mp4" 
                ref={vid1} 
                className={s.vid1_home} 
                autoplay 
                muted 
                loop 
            ></video>
            <video 
                key="video2" 
                id="video2" 
                src={video} 
                type="video/mp4" 
                ref={vid2} 
                className={s.vid2_home} 
                autoplay 
                muted 
                loop 
            ></video>
            {/* <video 
                key="video3" 
                id="video3" 
                src={video} 
                type="video/mp4" 
                ref={vid3} 
                className={s.vid3_home} 
                autoplay 
                muted 
                loop 
            ></video>
            <video 
                key="video4" 
                id="video4" 
                src={video} 
                type="video/mp4" 
                ref={vid4} 
                className={s.vid4_home} 
                autoplay 
                muted 
                loop 
            ></video> */}
            <div className={s.content_home} >
                <FiltersAndSorts 
                    handleFilterSortChanges={handleFilterSortChanges} 
                    genres={GENRES}
                    O_F={O_F}
                    G_F={G_F}
                    S={S}
                    handleSubmitSearch={handleSubmitSearch}
                    handleInputSearchChange={handleInputSearchChange}
                    handleLeaveSearch={handleLeaveSearch}
                    name={name}
                />
                {
                    currentGames ? 
                    <Pagination 
                        numberOfAllGames={GAMES?.length} 
                        gamesPerPage={gamesPerPage} 
                        paginado={paginado}
                        currentPage={currentPage} 
                    /> : 
                    <Loading />
                }
                <div className={s.cards} >
                    {
                        currentGames ? 
                        currentGames.map(({ id, name, img, rating, genres, createdInDb}) => {
                            return (
                                <GameCard 
                                    key={id} 
                                    id={id} 
                                    name={name} 
                                    img={img} 
                                    rating={rating} 
                                    genres={genres} 
                                    createdInDb={createdInDb}
                                />
                            )
                        }) : 
                        <Loading />
                    }
                </div>
                {
                    currentGames ? 
                    <Pagination 
                        numberOfAllGames={GAMES?.length} 
                        gamesPerPage={gamesPerPage} 
                        paginado={paginado}
                        currentPage={currentPage} 
                    /> : 
                    <Loading />
                }
            </div>
        </div>
    );
};