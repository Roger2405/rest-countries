import { Moon } from "phosphor-react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import './styles.scss';


export default function Header() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const html = document.querySelector('html');
        html?.classList.toggle('dark-mode');
    }, [darkMode]);


    return (
        <>
            <div className='header'>
                <h1 className='header__title'>Where in the world?</h1>
                <button className='header__modeSwitcher' onClick={() => setDarkMode(!darkMode)}>
                    <Moon size={20} />
                    Dark mode
                </button>
            </div>

            <Outlet />
        </>
    )
}