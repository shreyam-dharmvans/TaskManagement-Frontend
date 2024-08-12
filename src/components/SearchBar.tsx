import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { CiFilter } from "react-icons/ci";

export const SearchBar = () => {
    return (
        <div className='search-bar'>
            <div className='search-bar-whole'>
                <IoIosSearch className='icon-style' />
                <input type="text" className='search-bar-input' placeholder='Search project' />
            </div>

            <div className='filter-style'>
                <CiFilter />
                <select name="filter" className='select-filter' id="">
                    <option value="filter" disabled selected>Filter</option>
                </select>
            </div>
        </div>
    )
}
