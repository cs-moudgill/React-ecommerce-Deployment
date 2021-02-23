import React, { useEffect, useState } from 'react';
import '../styles.css';
import Base from './Base';
import Card from './Card';
import getAllProducts from './helper/coreapicalls';

function Home() {
const [products, setProducts] = useState([]);
const [error, setError] = useState(false);

const loadAllProducts=()=>{
    getAllProducts().then((data)=>{
        if(data.error){
            setError(data.error);
        }else{
            setProducts(data); //products assigned with products information.
        }
    })
}

useEffect(() => {
    loadAllProducts();
}, [])

    return (
        <Base title="Home Page" description="Welcome to the Tshirt Store">

            <div className="row text-center">
            <h1 className="text-white">All of Tshirts</h1>
            <div className="row">
            {products.map((product,index)=>{
                return (
                    <div key={index} className="col-4 mb-">
                    <Card product={product}/>
                    </div>
                )
            })}
            </div>
                
               
            </div>
        </Base>
    );
}

export default Home;  //here this file renders the data to Routes.js.
