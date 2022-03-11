import React from 'react'
import {Card} from 'antd';
import {Link} from 'react-router-dom'

const ProductListItems = ({product}) => {
    const {price, category, subs, shipping, color, brand, quantity, sold} = product;
    return(
        <ul className="list-group">
            <li className="list-group-item">
                Price{" "} 
                <span class="label float-end">
                    ${price}
                </span>
            </li>

            {category && (<li className="list-group-item ">
                Category{" "} 
                <Link to={`/category/${category.slug}`} class="label float-end">
                    {category.name}
                </Link>
            </li>)}

            {subs && 
            (<li className="list-group-item d-flex justify-content-between">
                Sub Category{" "} 
                {subs.map((s) => 
                <Link 
                 key={s._id}
                 to={`/sub/${s.slug}`} class="subspacing"
                >
                    {s.name}
                </Link>)}
            </li>)}

            <li className="list-group-item">
                Shipping{" "} 
                <span class="label float-end">
                    {shipping}
                </span>
            </li>

            <li className="list-group-item">
                Brand{" "} 
                <span class="label float-end">
                    {brand}
                </span>
            </li>

            <li className="list-group-item">
                Available{" "} 
                <span class="label float-end">
                    {quantity}
                </span>
            </li>

            <li className="list-group-item">
                Sold{" "} 
                <span class="label float-end">
                    {sold}
                </span>
            </li>
            
        </ul>
    )
};

export default ProductListItems;
