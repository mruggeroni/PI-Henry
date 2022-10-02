import React from "react";
import { Origin_Filter, Genre_Filter, Sort } from "../../redux/reducer";
import SearchBar from "../SearchBar/SearchBar";
import s from './FiltersAndSorts.module.css'


export default function FiltersAndSorts({ handleFilterSortChanges, genres, O_F, G_F, S, handleSubmitSearch, handleInputSearchChange, handleLeaveSearch, name }) {
    return (
        <>
            <div className={`${s.filtersAndSorts} ${s.filtersAndSorts_fixed}`} >
                <select 
                    className={s.filtersAndSortsItem}
                    key={Origin_Filter}
                    id={Origin_Filter} 
                    name={Origin_Filter} 
                    ref={O_F}
                    onChange={e => handleFilterSortChanges(e)} 
                >
                    <option 
                        key="All"
                        id="All"
                        value="All" 
                    >All</option>
                    <option 
                        key="false"
                        id="false"
                        value="false" 
                    >Existing</option>
                    <option 
                        key="true"
                        id="true"
                        value="true" 
                    >Created</option>
                </select>
                <select 
                    className={s.filtersAndSortsItem}
                    key={Genre_Filter}
                    id={Genre_Filter} 
                    name={Genre_Filter} 
                    ref={G_F}
                    onChange={e => handleFilterSortChanges(e)} 
                >
                    <option 
                        key="All"
                        id="All"
                        value="All" 
                    >All</option>
                    {
                        genres?.map(genre => {
                            return (
                                <option 
                                    key={genre}
                                    id={genre}
                                    value={genre}
                                >{genre}</option>
                            )
                        })
                    }
                </select>
                <select 
                    className={s.filtersAndSortsItem}
                    key={Sort}
                    id={Sort} 
                    name={Sort} 
                    ref={S}
                    onChange={e => handleFilterSortChanges(e)} 
                >
                    <option 
                        key="none"
                        id="none"
                        value="none" 
                    >-</option>
                    <option 
                        key="Ascending_Alphabetic_Sort"
                        id="Ascending_Alphabetic_Sort"
                        value="Ascending_Alphabetic_Sort" 
                    >Ascending Alphabetic Sort</option>
                    <option 
                        key="Descending_Alphabetic_Sort"
                        id="Descending_Alphabetic_Sort"
                        value="Descending_Alphabetic_Sort" 
                    >Descending Alphabetic Sort</option>
                    <option 
                        key="Ascending_Rating_Sort"
                        id="Ascending_Rating_Sort"
                        value="Ascending_Rating_Sort" 
                    >Ascending Rating Sort</option>
                    <option 
                        key="Descending_Rating_Sort"
                        id="Descending_Rating_Sort"
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
            <div className={s.filtersAndSorts} ></div>
        </>
    );
};