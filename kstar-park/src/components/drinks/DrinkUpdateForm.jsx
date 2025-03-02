import React from 'react'
import { useState,useEffect } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

export const DrinkUpdateForm = ({drinkId}) => {
  const navigate = useNavigate();
  const [drinks, setDrinks] = useState('');
  const [drinkName,setDrinkName] = useState('');
  const [drinkPrice,setDrinkPrice] = useState('');
  const [drinkBuyingPrice,setDrinkBuyingPrice] = useState('');
  const [error,setError] = useState('');
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
     axios.get(`http://localhost:8084/api/drink/find/${drinkId}`,{
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      }).then((response) => {
        setDrinkName(response.data.drinkName);
        setDrinkPrice(response.data.drinkPrice);
        setDrinkBuyingPrice(response.data.drinkBuyingPrice)
     }).catch((error) => {
      setError(error.message);
     });
  }, [drinkId]);

  const handleSubmit = (e) =>{
    e.preventDefault();
    updateDrink(drinkId,drinkPrice,drinkBuyingPrice);
  }

  const updateDrink = (drinkId,drinkPrice,drinkBuyingPrice) =>{
    axios.put('http://localhost:8084/api/drink/update-price/',{
        id: drinkId, 
        drinkPrice: drinkPrice,
        drinkBuyingPrice: drinkBuyingPrice,
    },{
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      }).then((response) => {
        setDrinks([response.data,...drinks]);
        navigate('/drinks');
    })
    .catch((err) => {
        setError(err.message);
    });
  }


  return (
    <>
    <div class="add-container">
        <div class="card-input">
            <div class="top-side">
                <a href="#" id="cancellogin"><i class="fa-sharp fa-solid fa-circle-xmark"></i></a>
            </div>
            <div class="middle-side">
                <p>HUISHA KIYWAJI</p>
            </div>
            <div class="botton-side">
                <form onSubmit={handleSubmit} class="input-form">
                    <div class="in-input">
                        <p class="message-box"><a class="message" href="#">{error}</a></p>
                    </div>
                    <div class="in-input">
                        <i class="fa-solid fa-envelope"></i>
                        <input type="text" value={drinkName} readOnly placeholder="JINA LA KINYWAJI" onChange={(e) => setDrinkName(e.target.value)}/>
                    </div>
                    <div class="in-input">
                        <i class="fa-solid fa-lock"></i>
                        <input type="number" value={drinkPrice} placeholder="BEI YA KUUZA" onChange={(e) => setDrinkPrice(e.target.value)}/>
                    </div>
                    <div class="in-input">
                        <i class="fa-solid fa-lock"></i>
                        <input type="number" value={drinkBuyingPrice} placeholder="BEI YA KUNUNUA" onChange={(e) => setDrinkBuyingPrice(e.target.value)}/>
                    </div>
                    <div class="in-input-text">
                        <button type="submit">HUISHA</button>
                    </div>
                    <div class="in-input-text">
                        <Link to="/drinks" className='cancelBtn'><button type="reset">GHAIRI</button></Link>
                    </div>
                    
                </form>
            </div>

        </div>
    </div>
    </>
  )
}
