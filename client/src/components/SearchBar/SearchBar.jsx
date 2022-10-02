import React from "react";
import s from "./SearchBar.module.css";


export default function SearchBar({ handleSubmitSearch, handleInputSearchChange, handleLeaveSearch, name }) {
    return (
        <div>
            <form 
                className={`${s.form}`}
                name="search"
                onSubmit={e => handleSubmitSearch(e)} 
            >
                <input
                    className={`${s.items} ${s.search}`}
                    type="text"
                    title="Search game"
                    placeholder="Search game"
                    value={name}
                    onChange={e => handleInputSearchChange(e)}
                />
                {
                    name && <button 
                    className={`${s.items} ${s.buttonDelete}`}
                        type="button"
                        onClick={e => handleLeaveSearch(e)}
                    >
                        <b>x</b>
                    </button>
                }
                <input 
                    className={`${s.items} ${s.buttonSearch}`}
                    type="submit" 
                    value="Search" 
                />
            </form>
        </div>
    );
};