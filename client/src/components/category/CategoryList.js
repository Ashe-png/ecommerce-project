import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {getCategories} from '../../functions/category';

const CategoryList =() => {
    const [categories, setcategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getCategories().then(c => {
            setcategories(c.data);
            setLoading(false);
        });
    },[]);

    const showCategories = () => categories.map((c) => (
        <div className='col btn btn-outline-primary btn-lg m-3'>
            <Link to={`/category/${c.slug}`}>{c.name}</Link>
        </div>)
    )

    return (
        <div className='container'>
            <div className="row">
                {loading ? (<h4 className='text-center'>Loading..</h4>) : showCategories()}
            </div>
        </div>
    )
};

export default CategoryList;