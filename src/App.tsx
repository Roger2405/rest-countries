import Axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react'
import Countries from './components/Countries';
import InputFilter from './components/InputFilter';
import InputSearch from './components/InputSearch';
import './styles/header.scss';
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const html = document.querySelector('html');
    html?.classList.toggle('dark-mode');
  }, [darkMode]);

  const [countries, setCountries] = useState<any[]>([]);

  console.log('atualizou')

  useEffect(() => {
    Axios.get('https://restcountries.com/v3.1/all')
      .then((res) => {
        setCountries(res.data);

      })
      .catch(err => {
        console.log(err)
      })

  }, []);

  return (
    <div className='app'>
      <div className='header'>
        <h1 className='header__title'>Where in the world?</h1>
        <button className='header__modeSwitcher' onClick={() => setDarkMode(!darkMode)}>Dark mode</button>
      </div>
      <main>
        <InputSearch setSearch={setSearch} />
        <InputFilter setFilter={setFilter} />

        <Countries countries={(countries.filter(i => {
          return i['region'].toLowerCase().includes(filter) && i['name']['common'].toLowerCase().includes(search.toLowerCase());
        }))} />
      </main>

    </div>
  )
}

export default App
