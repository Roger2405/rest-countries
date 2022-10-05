import './styles.scss';
import { useEffect, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    countries: any[]
}

export default function Countries({ countries }: Props) {

    const navigate = useNavigate();

    function goToDetails(name: string) {
        navigate(`/details/${name}`)
    }

    return (

        < div className='countries' >
            {
                countries.map(country => {
                    const name = country['name']['common'];
                    const image = country['flags']['svg'];
                    const population = country['population'];
                    const region = country['region'];
                    const capital = country['capital'];

                    return (
                        <div className='country' key={countries.indexOf(country)} onClick={() => goToDetails(name)}>
                            <img className='country__image' src={image} alt="" />
                            <div className='country__info'>
                                <h2 className='country__info--name'>{name}</h2>
                                <div className='country__info--details'>
                                    <p>
                                        <b>Population: </b>{population}
                                    </p>
                                    <p>
                                        <b>Region: </b>{region}
                                    </p>
                                    <p>
                                        <b>Capital: </b>{capital}
                                    </p>

                                </div>

                            </div>
                        </div>)
                }
                )

            }

        </div >)

}
