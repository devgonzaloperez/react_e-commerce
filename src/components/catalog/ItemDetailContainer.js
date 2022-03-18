import React, { useState, useEffect } from 'react';
import { ItemDetail } from './ItemDetail';
import { useParams } from 'react-router-dom';
import { /*collection, getDocs,*/ doc, getDoc} from 'firebase/firestore';
import { db } from '../../firebase';
import './ItemDetailContainer.scss';

export const ItemDetailContainer = () => {

    const {itemID} = useParams();
    const [item, setItem] = useState({});

    useEffect(()=>{

        const itemRef = doc(db, "itemsOK", itemID);
        getDoc(itemRef)
        .then(snapshot => {
            if(snapshot.exists()){
                const item = {id: snapshot.id, ...snapshot.data()}
                setItem(item)
            }
        })
        .catch(error =>{
            console.log(error)
        })

    }, [itemID])

    return (
        <div className="itemDetailContainer">
            <ItemDetail item={item}/>
        </div>
    )
};
