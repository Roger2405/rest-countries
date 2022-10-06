import { useNavigate } from "react-router-dom";
import CountryTag from "../CountryTag";
import Loading from "../Loading";

import './styles.scss';
interface Props {
    borderCountriesName: string[];
}

export default function BorderCountries({ borderCountriesName }: Props) {
    const navigate = useNavigate();

    function goToDetails(countryName: string) {
        navigate(`/details/${countryName}`)
        window.location.reload();
    }

    return (
        <div className="div-borderCountries">
            <h3 className="title">Border Countries: </h3>
            {
                borderCountriesName.length ?
                    <div className="country__tags">
                        {
                            borderCountriesName.map(countryName => {
                                return <CountryTag countryName={countryName} onClick={() => goToDetails(countryName)} />
                            }
                            )
                        }

                    </div>
                    :
                    <Loading />
            }

        </div>
    )
}