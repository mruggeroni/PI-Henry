import React from "react";
import s from './Pagination.module.css'


export default function Pagination({ numberOfAllGames, gamesPerPage, paginado, currentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(numberOfAllGames / gamesPerPage); i++) {
        pageNumbers.push(i);
    };

    return (
        <div className={s.paginatedBox} >
                {
                    numberOfAllGames ? 
                    <button key={"back"} onClick={() => {
                        0 < currentPage - 1 ?
                        paginado(currentPage - 1) :
                        paginado(currentPage);
                    }} >
                        <b>{"<"}</b>
                    </button> : 
                    <></>
                }
                {
                    numberOfAllGames ? 
                    pageNumbers.map(number => {
                        return (
                            <button key={number} onClick={() => paginado(number)} >{number}</button>
                        )
                    }) : 
                    <></>
                }
                {
                    numberOfAllGames ? 
                    <button key={"next"} onClick={() => {
                        currentPage + 1 <= pageNumbers.length ?
                        paginado(currentPage + 1) :
                        paginado(currentPage);
                    }} >
                        <b>{">"}</b>
                    </button> : 
                    <></>
                }
            <div>
                <span>
                    <b>{`${currentPage} / ${pageNumbers.length + (pageNumbers.length ? 0 : 1)}`}</b>
                </span>
            </div>
        </div>
    );
};