import React from 'react';
import { Item } from './Item';
import './ItemList.scss';

export const ItemList = ({items}) => {
    return(
        
        <div className="itemList animate__animated animate__fadeIn">
            {items.map((item) =>
                <Item key={item.id} item={item}/>
            )}
        </div>
    )
};
