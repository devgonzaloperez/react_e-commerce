import React from 'react';
import { AppRouter } from './components/routers/AppRouter';
import { CartContextProvider } from './context/CartContext';

export const App = () => {
    return(
        <CartContextProvider>
            <AppRouter/>
        </CartContextProvider>
    )
};

