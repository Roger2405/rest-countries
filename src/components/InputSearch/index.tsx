import './styles.scss';
import { MagnifyingGlass } from 'phosphor-react';
import React from 'react';

interface Props {
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function InputSearch({ setSearch }: Props) {
    return (
        <div className='input'>
            <MagnifyingGlass className='input__icon' size={16} />
            <input type="search" className='input__field' placeholder='Search for a country...' onChange={(e) => setSearch(e.target.value)} />

        </div>
    )
}