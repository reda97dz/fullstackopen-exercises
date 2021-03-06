import React from 'react'
import Country from './Country'

const Content = ({list, setCountries}) => {
    if (list.length > 10) {
        return (
            <p>Too many matches, choose another filter</p>
        )
    } else if ((list.length <= 10 && list.length > 1) || list.length === 0) {
        return (
            <ul>
                {list.map((country, i) => 
                    <li key={i}> {country.name} <button onClick={()=>{setCountries([country])}} > SHOW </button> </li>
                )}
            </ul>
        )
    } else {
        return (
            <Country country={list[0]} />
        )
    }
}

export default Content