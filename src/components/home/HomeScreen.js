import React from 'react';
import { NavLink } from 'react-router-dom';
import './HomeScreen.scss';

export const HomeScreen = () => {
    return(
        <main className="homeScreen__main">
            <section className="homeScreen__main-sectionOne">
                <div className="homeScreen__main-sectionOne-title animate__animated animate__fadeInLeft">
                    <h1>¡Bienvenido!</h1>
                    <h2>Visitá Nuestro <NavLink to='./catalog'>Catálogo</NavLink>.</h2>
                    <p>Encontrá los mejores precios.</p>
                </div>
                <div className="homeScreen__main-sectionOne-phone animate__animated animate__fadeInRight">
                    <img src="https://res.cloudinary.com/dwtfhdu4g/image/upload/v1646866561/IphoneSEBlack_ib68kw.png" alt="Phone"/>
                </div>    
            </section>
        </main>
    )
};
