import React from 'react'
import { useState,useEffect } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

export const DrinkUpdateForm = ({drinkId}) => {
  const navigate = useNavigate();
  const [drinks, setDrinks] = useState('');
  const [drinkName,setDrinkName] = useState('');
  const [drinkPrice,setDrinkPrice] = useState('');
  const [error,setError] = useState('');

  useEffect(() => {
     axios.get(`http://localhost:8085/api/drink/find/${drinkId}`).then((response) => {
        setDrinkName(response.data.drinkName);
        setDrinkPrice(response.data.drinkPrice);
     }).catch((error) => {
      setError(error.message);
     });
  }, [drinkId]);

  const handleSubmit = (e) =>{
    e.preventDefault();
    updateDrink(drinkId,drinkPrice);
  }

  const updateDrink = (drinkId,drinkPrice) =>{
    axios.put('http://localhost:8085/api/drink/update-price/',{
        id: drinkId, 
        drinkPrice: drinkPrice,
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
                        <input type="number" value={drinkPrice} placeholder="BEI" onChange={(e) => setDrinkPrice(e.target.value)}/>
                    </div>
                    <div class="in-input-text">
                        <button type="submit">SAJILI</button>
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
