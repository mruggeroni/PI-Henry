import React from "react";
import { Origin_Filter, Genre_Filter, Sort } from "../redux/reducer";
import SearchBar from "./SearchBar";


export default function FiltersAndSorts({ handleFilterSortChanges, genres, O_F, G_F, S, handleSubmitSearch, handleInputSearchChange, handleLeaveSearch, name }) {
    return (
        <div>
            <select 
                ref={O_F}
                key={Origin_Filter}
                name={Origin_Filter} 
                id={Origin_Filter} 
                onChange={e => handleFilterSortChanges(e)} 
            >
                <option 
                    // key="AllO"
                    // id="AllO"
                    value="All" 
                >All</option>
                <option 
                    // key="false"
                    // id="false"
                    value="false" 
                >Existing</option>
                <option 
                    // key="true"
                    // id="true"
                    value="true" 
                >Created</option>
            </select>
            <select 
                ref={G_F}
                key={Genre_Filter}
                id={Genre_Filter} 
                name={Genre_Filter} 
                onChange={e => handleFilterSortChanges(e)} 
            >
                <option 
                    // key="AllG"
                    // id="AllG"  
                    value="All" 
                >All</option>
                {
                    genres?.map(genre => {
                        return (
                            <option 
                                // key={genre}
                                // id={genre}
                                value={`${genre}`}
                            >{genre}</option>
                        )
                    })
                }
            </select>
            <select 
                ref={S}
                key={Sort}
                name={Sort} 
                id={Sort} 
                onChange={e => handleFilterSortChanges(e)} 
            >
                <option 
                    // key="none" 
                    // id="none" 
                    value="none" 
                >-</option>
                <option 
                    // key="Ascending_Alphabetic_Sort" 
                    // id="Ascending_Alphabetic_Sort" 
                    value="Ascending_Alphabetic_Sort" 
                >Ascending Alphabetic Sort</option>
                <option 
                    // key="Descending_Alphabetic_Sort" 
                    // id="Descending_Alphabetic_Sort" 
                    value="Descending_Alphabetic_Sort" 
                >Descending Alphabetic Sort</option>
                <option 
                    // key="Ascending_Rating_Sort" 
                    // id="Ascending_Rating_Sort" 
                    value="Ascending_Rating_Sort" 
                >Ascending Rating Sort</option>
                <option 
                    // key="Descending_Rating_Sort" 
                    // id="Descending_Rating_Sort" 
                    value="Descending_Rating_Sort" 
                >Descending Rating Sort</option>
            </select>
            <SearchBar 
                handleSubmitSearch={handleSubmitSearch} 
                handleInputSearchChange={handleInputSearchChange} 
                handleLeaveSearch={handleLeaveSearch}
                name={name}
            />
        </div>
    );
};