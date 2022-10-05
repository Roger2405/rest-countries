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

    useEffect(() => {
        Axios.get(`https://restcountries.com/v3.1/name/${name}`)
            .then((res) => {
                let response = res.data;

                setCountry(response);

            })
            .catch(err => {
                console.log(err)
            })

    }, []);

    console.log(country ? country[0] : 'o objeto é nulo');
    //const teste = country ? JSON.stringify(country[0]['name']['nativeName'][0]['common']) : '';
    return (
        <div className="details">
            <button className="buttonBack" onClick={() => navigate(-1)}>
                <ArrowLeft />
                Back
            </button>

            {country ?

                <div className="content">
                    <img className="flag" src={country[0]['flags']['svg']} alt="" />
                    <div className="info">
                        <h1 className="name">{name}</h1>
                        <div className="div-descriptions">
                            <div className="description">
                                <p className="description__label">Native Name:{ }</p>
                                <p className="description__label">Population:{country[0]['population']}</p>
                                <p className="description__label">Region:{country[0]['region']}</p>
                                <p className="description__label">Sub Region:{country[0]['subregion']}</p>
                                <p className="description__label">Capital:{country[0]['capital']}</p>
                            </div>
                            <div className="description">
                                <p className="description__label">Top Level Domain:{country[0]['tld']}</p>
                                <p className="description__label">Currencies:{ }</p>
                                <p className="description__label">Languages:</p>
                            </div>
                        </div>
                        <h3>Border Countries</h3>

                    </div>


                </div >
                :
                <Loading />
            }
        </div>

    )
}