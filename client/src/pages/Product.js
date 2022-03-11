import React, {useEffect, useState}from 'react'
import {getProduct, productStar, getRelated} from '../functions/product';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import SingleProduct from '../components/cards/SingleProduct.js'
import ProductCard from '../components/cards/ProductCard';

const Product = () => {
    const [product, setProduct] =useState({});
    const[star, setStar] = useState(0);
    const [related, setRelated] = useState([])

    const {user} = useSelector ((state)=> ({...state}));

    const{slug}= useParams();

    useEffect(() => {
        loadSingleProduct();

    },[slug])

    useEffect(()=> {
        if(product.ratings && user) {
            let existingRatingObject = product.ratings.find(
                (ele) => ele.postedBy.toString() === user._id.toString()
            );
            existingRatingObject && setStar(existingRatingObject.star);

        }
    })

    const loadSingleProduct =() =>{
        getProduct(slug).then((res) => {
            setProduct(res.data);
            getRelated(res.data._id).then((res) => setRelated(res.data))
        });
    }

    const onStarClick = (newRating, name) => {
        setStar(newRating);
        console.table(newRating, name);
        productStar(name, newRating, user.token)
        .then(res => {
            console.log('rating clicked',res.data);
            loadSingleProduct();//if you want to show updated rating in real time
        })
    }

    return (
        <div className='container-fluid'>
            <div className='row pt-4'>
                <SingleProduct product={product} onStarClick={onStarClick} star={star}/>
            </div>

            <div clsasName="row">
                <div className="col text-center pt-5 pb-1">
                    <hr/>
                    <h4>Related Product</h4>
                    <hr/>
                    {/* {JSON.stringify(related)} */}
                </div>
            </div>

            <div className='row pb-5'>
                {related.length ? related.map((r) => (<div key={r._id} className="col-md-3">
                    <ProductCard product={r}/>
                </div> ))
                : <div className="text-center col"> "No products found"</div>
                }
            </div>
        </div>
    );
};

export default Product;

