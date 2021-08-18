import React from 'react'

const Country = ({country}) => {
    return (
        <div>
            <h1> {country.name} </h1>
            
            <p> capital {country.capital} </p>
            <p> populatin {country.population} </p>
            
            <h1>Languages</h1>

            <ul>
                {country.languages.map(language => 
                    <li key={language.name}>{language.name}</li>)}
            </ul>
            
            <img src={country.flag} alt={country.name} />

        </div>
    )
}

export default Country