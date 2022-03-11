import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import AdminNav from '../../../components/nav/AdminNav';
import { useSelector } from 'react-redux';
import {
    getProduct,
    updateProduct,
} from '../../../functions/product';
import {getCategories, getCategorySubs, updateCategory} from '../../../functions/category';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';
import FileUpload from '../../../components/forms/FileUpload';
import {LoadingOutlined} from '@ant-design/icons';
import { useParams, useNavigate} from 'react-router-dom';

const initialState = {
    title: '',
    description: '',
    price: '',
    category: '',
    subs: [],
    shipping: '',
    quantity: '',
    images: [],
    colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
    brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Asus'],
    color: '',
    brand: '',
}


const ProductUpdate = () => {
    let navigate = useNavigate();

    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([]);
    const [categories, setCategories] =useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [arrayOfSubs, setArrayOfSubs]= useState([]);
    const [loading, setLoading] = useState(false);


    const {user} = useSelector((state)=> ({...state}));
   let {slug} = useParams();

   useEffect(() => {
       loadProduct();
       loadCategories();
   },[])

   const loadProduct = () => {
       getProduct(slug)
       .then(p => {
          // console.log('single produt', p);
          //load single product
          setValues({...values, ...p.data});
          //load single product category subs
          getCategorySubs(p.data.category._id)
          .then(res => {
              setSubOptions(res.data);
          });
          //prepare array of sub ids to show as default sub values in antd select
          let arr = []
          p.data.subs.map(s => {
              arr.push(s._id);
          });
          setArrayOfSubs((prev) => arr);
       });
   };

   const loadCategories = () => getCategories().then((c) => {
    setCategories(c.data);
});

   const handleSubmit = (e) => {
       
       e.preventDefault();
        setLoading(true);

        values.subs = arrayOfSubs;
        values.category = selectedCategory ? selectedCategory : values.category;
        updateProduct(slug, values, user.token)
        .then(res => {
            setLoading(false)
            toast.success(`${res.data.title}  is updated`);
            navigate('/admin/products');
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            // if (err.response.status === 400) toast.error(err.response.data);
            toast.error(err.response.data.err);

        });
   };

   const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value });
    //console.log(e.target.name, '------', e.target.value);
};

    const handleCategoryChange =(e) =>{
        e.preventDefault();
        console.log("clicked category", e.target.value);
        setValues({...values, subs: []});
        setSelectedCategory(e.target.value);
        getCategorySubs(e.target.value)
        .then(res => {
            console.log("subOption category clicked", res)
            setSubOptions(res.data);
        });
        //if user clicks back tothe original category so it s sub category is default
        if(values.category._id === e.target.value){
            loadProduct();
        }
        //clear old category id
        setArrayOfSubs([]);
    };
  
    return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav/>
            </div>
            
            <div className="col">
            {loading ? (<h4 className='text-danger' >Loading</h4>) : (<h4>Product Update</h4>)}
            {/* {JSON.stringify(values)} */}
            <div className="p-3 mt-3" >
                <FileUpload 
                values={values} 
                setValues={setValues} 
                setLoading={setLoading}
                />
            </div>
            <br/>
            <ProductUpdateForm 
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleCategoryChange={handleCategoryChange}
                setValues={setValues}
                categories={categories}
                subOptions={subOptions}
                values={values}
                arrayOfSubs={arrayOfSubs}
                setArrayOfSubs={setArrayOfSubs}
                selectedCategory={selectedCategory}

            />
            <hr/>
                   
                 
            </div>
        </div>
    </div>

    );
};

export default ProductUpdate;