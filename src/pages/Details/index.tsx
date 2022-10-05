import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft } from 'phosphor-react';

import './styles.scss';
import '../../styles/base.scss';
import Loading from "../../components/Loading";


export default function Details() {

    const { name } = useParams();
    const navigate = useNavigate();

    const [country, setCountry] = useState<any>();
    const [borderCountriesName, setBorderCountriesName] = useState<any[]>([]);
    let langList: any = [];

    useEffect(() => {
        Axios.get(`https://restcountries.com/v2/name/${name}`)
            .then((res) => {
                let response = res.data;
                let country = response[0];
                setCountry(country);
                requestAndSetBorderCountryNames(country.borders);
            })
            .catch(err => {
                console.log(err)
            });
    }, []);


    async function requestAndSetBorderCountryNames(borderCountries: any[]) {
        let arrNames = [];
        for (let i = 0; i < borderCountries.length; i++) {
            const borderCountry = borderCountries[i];
            const name = await Axios.get(`https://restcountries.com/v2/alpha/${borderCountry}`)
                .then(res => {
                    return res.data.name;
                }).catch(err => {
                    console.log(err);
                })
            arrNames.push(name);
        }
        setBorderCountriesName(arrNames);

    }

    return (
        <div className="details">
            <button className="buttonBack" onClick={() => navigate(-1)}>
                <ArrowLeft />
                Back
            </button>

            {country ?
                <div className="content">

                    <img className="flag" src={country.flags.svg} alt="" />
                    <div className="info">
                        <h1 className="name">{country.name}</h1>
                        <div className="div-descriptions">
                            <div className="description">
                                <p className="description__label"><b>Native Name: </b>{country.nativeName}</p>
                                <p className="description__label"><b>Population: </b>{country.population}</p>
                                <p className="description__label"><b>Region: </b>{country.region}</p>
                                <p className="description__label"><b>Sub Region: </b>{country.subregion}</p>
                                <p className="description__label"><b>Capital: </b>{country.capital}</p>
                            </div>
                            <div className="description">
                                <p className="description__label"><b>Top Level Domain: </b>{country.topLevelDomain}</p>
                                <p className="description__label"><b>Currencies: </b>{country.currencies[0].name}</p>
                                {
                                    country.languages.map((lang: any) => {
                                        langList.push(lang.name)
                                    })
                                }
                                <p className="description__label"><b>Languages: </b>{langList.join(', ')}</p>

                            </div>
                        </div>
                        <div className="borderCountries">
                            <h3 className="borderCountries__title">Border Countries: </h3>
                            <div className="borderCountries__tags">
                                {
                                    borderCountriesName.map(countryName => {
                                        return <div className="borderCountries__tags--country">{countryName}</div>
                                    })
                                }

                            </div>

                        </div>

                    </div>


                </div >
                :
                <Loading />
            }
        </div >

    )
}
