import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Header } from '../header/Header';
import { HomeScreen } from "../home/HomeScreen";
import { CatalogScreen } from "../catalog/CatalogScreen";
import { CartScreen } from "../cart/CartScreen";
import { ItemDetailContainer } from "../catalog/ItemDetailContainer";

export const AppRouter = () => {
    return (
        <Router>
                <Header/>
                <Routes>
                    <Route exact path="/" element={<HomeScreen/>}/>
                    <Route exact path="/catalog" element={<CatalogScreen/>}/>
                    <Route exact path="/catalog/category/:category" element={<CatalogScreen/>}/>
                    <Route exact path="/catalog/product/:itemID" element={<ItemDetailContainer/>}/>
                    <Route exact path="/cart" element={<CartScreen/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
        </Router>
    )
};
