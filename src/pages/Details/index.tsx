import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft } from 'phosphor-react';

import './styles.scss';
import '../../styles/base.scss';
import Loading from "../../components/Loading";
import ButtonBack from "../../components/ButtonBack";
import CountryTag from "../../components/CountryTag";
import BorderCountries from "../../components/BorderCountries";


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
        let arrNames: any[] = [];
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

    function goBack() {
        navigate(-1);
        setTimeout(() => {
            window.location.reload();
        }, 250);
    }

    return (
        <div className="details">
            <ButtonBack onClick={() => goBack()} />

            <div className="content">
                {country ?
                    <>

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
                            <BorderCountries borderCountriesName={borderCountriesName} />

                        </div>
                    </>
                    :
                    <Loading />
                }
            </div >
        </div >

    )
}
