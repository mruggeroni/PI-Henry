import React from "react";


export default function Pagination({ numberOfAllGames, gamesPerPage, paginado, currentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(numberOfAllGames / gamesPerPage); i++) {
        pageNumbers.push(i);
    };

    return (
        <div>
            <ul>
                {numberOfAllGames && 
                    <li key={"back"} >
                        <button key={"back"} onClick={() => {
                            0 < currentPage - 1 ?
                            paginado(currentPage - 1) :
                            paginado(currentPage);
                        }} >
                            <b>{"<"}</b>
                        </button>
                    </li>
                }
                {numberOfAllGames && pageNumbers.map(number => {
                    return (
                        <li key={number} >
                            <button key={number} onClick={() => paginado(number)} >{number}</button>
                        </li>
                    )
                })}
                {numberOfAllGames && 
                    <li key={"next"} >
                        <button key={"next"} onClick={() => {
                            currentPage + 1 <= pageNumbers.length ?
                            paginado(currentPage + 1) :
                            paginado(currentPage);
                        }} >
                            <b>{">"}</b>
                        </button>
                    </li>
                }
            </ul>
            <div>
                <span>
                    <b>{`${currentPage} / ${pageNumbers.length + (pageNumbers.length ? 0 : 1)}`}</b>
                </span>
            </div>
        </div>
    );
};