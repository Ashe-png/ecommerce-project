import React, {useEffect, useState} from "react";
import Jumbotron from '../components/cards/Jumbotron';
import NewArrivals from '../components/home/NewArrivals';
import BestSellers from '../components/home/BestSellers'
import CategoryList from '../components/category/CategoryList'
import SubList from '../components/sub/SubList';

const Home = () => {

return (
  <div>
    <div className='container-fluid bg-light text-danger h1 font-weight-bold text-center p-5'>
      <Jumbotron text={['Latest Products', 'New Arrivals', 'Best Sellers']}/>
    </div>

    <h4 className="text-center p-3 mt-5 mb-5 display-6 bg-light">New Arrivals</h4>

    <NewArrivals/>

    <h4 className="text-center p-3 mt-5 mb-5 display-6 bg-light">Best Sellers</h4>

    <BestSellers/>
    
    <br/>
    <h4 className="text-center p-3 mt-5 mb-5 display-6 bg-light">Categories</h4>

    <CategoryList/>
    
    <br/>
    <h4 className="text-center p-3 mt-5 mb-5 display-6 bg-light">Sub Categories</h4>

    <SubList/>
    
    <br/>
  </div>
);
};

export default Home;
