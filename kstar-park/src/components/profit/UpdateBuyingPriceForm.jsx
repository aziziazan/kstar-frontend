import React from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';

export const UpdateBuyingPriceForm = ({soldDrinkId}) => {
    const [buyingPrice,setBuyingPrice] = useState('');
    const [drinkName,setDrinkName] = useState('');

    const [soldDrinks,setSoldDrinks] = useState([]);
    
    const [error,setError] = useState('');
    const navigate = useNavigate();
    const { keycloak, initialized } = useKeycloak();
  
    useEffect(() => {
  
        axios.get(`http://localhost:8084/api/solid-drink/find-sold-drink/${soldDrinkId}`,{
          headers: {
            Authorization: `Bearer ${keycloak.token}`
          }
        }).then((response) => {
           setBuyingPrice(response.data.buyingPrice);
           setDrinkName(response.data.drinkName);
        }).catch((error) => {
            setError(error.message);
        });
  
    
    },[soldDrinkId]);
    
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        addBuyingPrice(soldDrinkId,buyingPrice)
        console.log(buyingPrice);
        console.log(soldDrinkId);
        navigate('/profit');
    }
  
  
    const addBuyingPrice = (soldDrinkId,buyingPrice) => {
        axios.put('http://localhost:8084/api/solid-drink/update-buying-price/',{
            id: soldDrinkId,
            buyingPrice: buyingPrice,
        },{
            headers: {
              Authorization: `Bearer ${keycloak.token}`
            }
          }).then((response) => {
            setSoldDrinks([response.data,...soldDrinks]);
        })
        .catch((err) => {
            setError(err.message);
        });
    };
  return (
        <>
        <div className="add-container">
            <div className="card-input">
                <div className="top-side">
                    <a href="#" id="cancellogin"><i className="fa-sharp fa-solid fa-circle-xmark"></i></a>
                </div>
                <div className="middle-side">
                    <p>INGIZA BEI ULIONUNULIA</p>
                </div>
                <div className="botton-side">
                    <form onSubmit={handleSubmit} class="input-form">
                        <div className="in-input">
                            <p className="message-box"><a className="message" href="#">{error}</a></p>
                        </div>

                        <div className="in-input">
                            <i className="fa-solid fa-envelope"></i>
                            <input type="text"  placeholder="JINA LA KINYAJI" value={drinkName.toUpperCase()} readOnly="true"/>
                        </div>
                        <div className="in-input">
                            <i className="fa-solid fa-lock"></i>
                            <input type="number"  placeholder="BEI YA KUNUNULIA" value={buyingPrice} onChange={(e) => setBuyingPrice(e.target.value)} required/>
                        </div>
                        <div className="in-input-text">
                            <button type="submit">INGIZA BEI</button>
                        </div>
                        <div className="in-input-text">
                            <Link to="/profit" className='cancelBtn'><button type="reset">GHAIRI</button></Link>
                        </div>
                        
                    </form>
                </div>
    
            </div>
        </div>
        </>
  )
}
