import React, { useState } from 'react'
import './DrinkForm.css'
import axios from "axios";
import { Link, replace, useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';



export const DrinkAddForm = () => {
    const [drinkName,setDrinkName] = useState('');
    const [drinkPrice,setDrinkPrice] = useState('');
    const [drinkBuyingPrice,setDrinkBuyingPrice] = useState('');
    const [drinks,setDrinks] = useState([]);
    const [error,setError] = useState('');
    const navigate = useNavigate();
    const { keycloak, initialized } = useKeycloak();


    const handleSubmit = (e) =>{
        e.preventDefault();
        addDrink(drinkName,drinkPrice,drinkBuyingPrice);
    }


    const addDrink = (drinkName,drinkPrice,drinkBuyingPrice) =>{
        axios.post('http://localhost:8084/api/drink/create/',{
            drinkName: drinkName,
            drinkPrice: drinkPrice,
            drinkBuyingPrice: drinkBuyingPrice,
        },{
            headers: {
              Authorization: `Bearer ${keycloak.token}`
            }
          }
        ).then((response) => {
            setDrinks([response.data,...drinks]);
            setDrinkName('');
            setDrinkPrice('');
            setDrinkBuyingPrice('');
            navigate('/drinks', { replace: true });
        })
        .catch((err) => {
            setError(err.message);
        });
        

    }

  return (
    <>
    <div className="add-container">
        <div className="card-input">
            <div className="top-side">
                <a href="#" id="cancellogin"><i className="fa-sharp fa-solid fa-circle-xmark"></i></a>
            </div>
            <div className="middle-side">
                <p>ONGEZA KIYWAJI</p>
            </div>
            <div className="botton-side">
                <form onSubmit={handleSubmit} class="input-form">
                    <div className="in-input">
                        <p className="message-box"><a className="message" href="#">{error}</a></p>
                    </div>
                    <div className="in-input">
                        <i className="fa-solid fa-envelope"></i>
                        <input type="text" value={drinkName} placeholder="JINA LA KINYWAJI" onChange={(e) => setDrinkName(e.target.value)}/>
                    </div>
                    <div className="in-input">
                        <i className="fa-solid fa-lock"></i>
                        <input type="number" value={drinkPrice} placeholder="BEI YA KUUZA" onChange={(e) => setDrinkPrice(e.target.value)}/>
                    </div>
                    <div className="in-input">
                        <i className="fa-solid fa-lock"></i>
                        <input type="number" value={drinkBuyingPrice} placeholder="BEI YA KUNUNUA" onChange={(e) => setDrinkBuyingPrice(e.target.value)}/>
                    </div>
                    <div className="in-input-text">
                        <button type="submit">ONGEZA</button>
                    </div>
                    <div className="in-input-text">
                        <Link to="/drinks" className='cancelBtn'><button type="reset">GHAIRI</button></Link>
                    </div>
                    
                </form>
            </div>

        </div>
    </div>
    </>
  );
}
