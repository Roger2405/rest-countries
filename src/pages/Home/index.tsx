import Axios from 'axios';
import { useEffect, useState } from 'react'
import Countries from '../../components/Countries';
import InputFilter from '../../components/InputFilter';
import InputSearch from '../../components/InputSearch';

import './styles.scss';
import '../../styles/base.scss';
import Loading from '../../components/Loading';

export default function Home() {

  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  const [countries, setCountries] = useState<any[]>([]);

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
    <div className='home'>
      <main>
        <div className='filterBar'>
          <InputSearch setSearch={setSearch} />
          <InputFilter setFilter={setFilter} />

        </div>
        {countries.length !== 0 ?
          <Countries countries={(countries.filter(i => {
            return i['region'].toLowerCase().includes(filter) && i['name']['common'].toLowerCase().includes(search.toLowerCase());
          }))} />
          :
          <Loading />

        }
      </main>

    </div>
  )
}

