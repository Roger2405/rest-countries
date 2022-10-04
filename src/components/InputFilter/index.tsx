import React from "react";
import { useEffect, useState } from "react";
import './styles.scss';

interface Props {
    setFilter: React.Dispatch<React.SetStateAction<string>>
}

export default function InputFilter({ setFilter }: Props) {
    return (

        <select className="selectFilter" name="filter-region" id="filter" onChange={(e) => {
            setFilter(oldValue => {
                let newValue = e.target.value;
                if (oldValue === newValue) return '';
                return newValue;
            });


        }}>
            <option className="selectFilter__option" value="">Filter by Region</option>
            <option className="selectFilter__option" value="africa">Africa</option>
            <option className="selectFilter__option" value="america">America</option>
            <option className="selectFilter__option" value="asia">Asia</option>
            <option className="selectFilter__option" value="europe">Europe</option>
            <option className="selectFilter__option" value="oceania">Oceania</option>

        </select>
    )
}