import React, { useEffect, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { useParams } from 'react-router-dom';
import { ItemList } from './ItemList';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import './ItemListContainer.scss';
import Lottie from 'lottie-react';
import loader from '../../assets/lottie/loader.json';
import emptySearch from '../../assets/lottie/emptySearch.json';

export const ItemListContainer = () => {

    const {loading, setLoading, search, items, setItems} = useContext(CartContext);

    const {category} = useParams();

    useEffect(()=>{
        getDocs(collection(db, "itemsOK"))
            .then(snapshot => {
                const items = snapshot.docs.map((doc) =>({id: doc.id, ...doc.data()}))
                if(search.length === 0){
                    if(!category || category === "all"){
                        setItems(items)
                    }else{
                        setItems(items.filter(item => item.category === category))
                    }
                }
                else{
                    setItems(items.filter((item) => 
                    item.category.toLowerCase().includes(search.toLowerCase())
                    || item.title.toLowerCase().includes(search.toLowerCase())
                    ))
                }
            })
            .catch(error =>{
                console.log(error)
            })
            .finally(()=>{
                setLoading(false)
            })
    }, [search, category]);

    const lottieLoaderOptions = {
        animationData: loader,
        autoplay: true,
        loop: true,
        style:{
            width: "200%"
        }
    }

    const lottieEmptySearchOptions = {
        animationData: emptySearch,
        autoplay: true,
        loop: true,
        style:{
            width: "50%"
        }
    }

    return (
        <div className="itemListContainer">
            {
                loading === true
                ? 
                <div className="itemListContainer__loaderContainer">
                    <Lottie {...lottieLoaderOptions}/>
                </div>
                : (items.length > 0) 
                ? 
                <ItemList items={items}/>
                : 
                <div className="itemListContainer__noResults">
                    <Lottie {...lottieEmptySearchOptions}/>
                    <h2>¡Lo sentimos!</h2>
                    <p>No hay resultados que coincidan con la búsqueda.</p>
                </div>
            }
        </div>
    )
};
