import { React, useContext } from 'react';
import { CartWidget } from './CartWidget';
import { CartContext } from '../../context/CartContext';
import { Link, NavLink } from 'react-router-dom';
import './Header.scss';

export const Header = () => {

    const {search, setSearch} = useContext(CartContext);

    const handleInputChange = (event) =>{
        setSearch(event.target.value)
    }

    const logoURL = "https://res.cloudinary.com/dwtfhdu4g/image/upload/v1646867986/Logo_ML_w9hvbl.png";

    const handleClick = () =>{
        setSearch("");
    }

    return (
        <header className="header">
                <Link to='./' className="header__logo"><img src={logoURL} alt="Logo"/></Link>
                <div className="header__search">
                    <input type="text" placeholder="Escriba la marca o el modelo. Por ejemplo: Apple o Iphone." onChange={handleInputChange} value={search} spellcheck="false"></input>
                    <div className="header__search-button">
                        <button>
                            <NavLink to='./catalog'>
                                <img src="https://res.cloudinary.com/dwtfhdu4g/image/upload/v1647377893/Magnifying_Glass_uz0ffw.png" alt="Magnifying Glass"/>
                            </NavLink>
                        </button>
                    </div>
                </div>
                <nav className="header__nav" onClick={handleClick}>
                    <ul>
                        <li><NavLink to='./'>Inicio</NavLink></li>
                        <li><NavLink to='./catalog'>Catálogo</NavLink></li>
                    </ul>
                </nav>
                <CartWidget/>
        </header>
    )
};
