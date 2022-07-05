import React from "react";


export default function SearchBar({ handleSubmitSearch, handleInputSearchChange, handleLeaveSearch, name }) {
    return (
        <div>
            <form 
                name="search"
                onSubmit={e => handleSubmitSearch(e)} 
            >
                <input
                    type="text"
                    title="Search game"
                    placeholder="Search game"
                    value={name}
                    onChange={e => handleInputSearchChange(e)}
                />
                {
                    name && <button 
                        type="button"
                        onClick={e => handleLeaveSearch(e)}
                    >
                        <b>x</b>
                    </button>
                }
                <input 
                    type="submit" 
                    value="Search" 
                />
            </form>
        </div>
    );
};