import {React, useContext} from 'react';
import { CartContext } from '../../context/CartContext';
import { ItemListContainer } from './ItemListContainer';
import { Link } from 'react-router-dom';
import './CatalogScreen.scss';

export const CatalogScreen = () => {

    const {setSearch} = useContext(CartContext);

    const handleClick = () =>{
        setSearch("");
    }

    return (
        <main className="catalogScreen__main">
            <div onClick={handleClick} className="catalogScreen__categories">
                <Link to={"/catalog/category/all"}><button>Todos</button></Link>
                <Link to={"/catalog/category/Apple"}><button>Apple</button></Link>
                <Link to={"/catalog/category/Samsung"}><button>Samsung</button></Link>
                <Link to={"/catalog/category/Xiaomi"}><button>Xiaomi</button></Link>
            </div>
            <ItemListContainer/>
        </main> 
    )
};
