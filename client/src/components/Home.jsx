import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { getGames,  /* getGamesFound, */   getGenres  /* , getPlatforms */, filtersAndSorts  } from "../redux/actions";
import FiltersAndSorts from "./FiltersAndSorts";
import GameCard from "./GameCard";
import Pagination from "./Pagination";


export default function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGames());
        dispatch(getGenres());
        // dispatch(getPlatforms());
    }, [dispatch]);

    const GAMES = useSelector(state => state.games);
    const GENRES = useSelector(state => state.genres);
    // const GAMES_FOUND = useSelector(state => state.gamesFound);

    const [orden, setOrden] = useState("none");
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage/* , setGamesPerPage */] = useState(15);
    const indexOfFirstGame = (currentPage - 1) * gamesPerPage,
        indexOfLastGame = (currentPage) * gamesPerPage,
        currentGames = GAMES.slice(indexOfFirstGame, indexOfLastGame);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handleChanges = (e) => {
        if (e.target.name === "Sort" || orden !== "none") {
            e.preventDefault();
            dispatch(filtersAndSorts({
                e_target_name: e.target.name, 
                e_target_value: e.target.value,
            }));
            setCurrentPage(1);
            e.target.name === "Sort" ? setOrden(e.target.value) : setOrden(orden);
        } else {
            dispatch(filtersAndSorts({
                e_target_name: e.target.name, 
                e_target_value: e.target.value,
            }));
        };
    };

    return (
        <div>
            <FiltersAndSorts handleChanges={handleChanges} genres={GENRES} />
            <h1>VideoGames App</h1>
            {currentGames && <Pagination 
                numberOfAllGames={GAMES?.length} 
                gamesPerPage={gamesPerPage} 
                paginado={paginado}
                currentPage={currentPage} 
            />}
            {currentGames?.map(({ id, name, img, rating, genres}) => {
                return (
                    <GameCard 
                        key={id} 
                        id={id} 
                        name={name} 
                        img={img} 
                        rating={rating} 
                        genres={genres} 
                    />
                )
            })}
            {currentGames && <Pagination 
                numberOfAllGames={GAMES?.length} 
                gamesPerPage={gamesPerPage} 
                paginado={paginado}
                currentPage={currentPage} 
            />}
        </div>
    );
};