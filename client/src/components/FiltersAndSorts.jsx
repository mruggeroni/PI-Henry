import React from "react";


export default function FiltersAndSorts({ handleChanges, genres }) {
    return (
        <div>
            <select name="Origin_Filter" id="Origin Filter" onChange={e => handleChanges(e)} >
                <option value="All" >All</option>
                <option value="false" >Existing</option>
                <option value="true" >Created</option>
            </select>
            <select name="Genre_Filter" id="Genre Filter" onChange={e => handleChanges(e)} >
                <option value="All" >All</option>
                {
                    genres?.map(genre => {
                        return <option value={`${genre}`} >{genre}</option>
                    })
                }
            </select>
            <select name="Sort" id="Sort" onChange={e => handleChanges(e)} >
                <option value="none" >-</option>
                <option value="Ascending_Alphabetic_Sort" >Ascending Alphabetic Sort</option>
                <option value="Descending_Alphabetic_Sort" >Descending Alphabetic Sort</option>
                <option value="Ascending_Rating_Sort" >Ascending Rating Sort</option>
                <option value="Descending_Rating_Sort" >Descending Rating Sort</option>
            </select>
        </div>
    );
};