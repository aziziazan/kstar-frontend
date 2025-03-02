import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

export const AddPromotionForm = () => {
  const [promotionName,setPromotionName] = useState('');
  const [numberOfDrinks,setNumberOfDrinks] = useState('');
  const [priceOfPromotion,setPriceOfPromotion] = useState('');
  const [drinkId,setDrinkId] = useState('');

  const [promotionDrinks,setPromotionDrinks] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const [error,setError] = useState('');
  const navigate = useNavigate();
  const [searchDrinkName,setSearchDrinkName] = useState('');
  const { keycloak, initialized } = useKeycloak();

     
    const handleSubmit = (e) =>{
        e.preventDefault();
        addPromotionDrink(promotionName,numberOfDrinks,priceOfPromotion,drinkId);
    
    }

    useEffect(() => {
        if(searchDrinkName == ''){
          axios.get(`http://localhost:8084/api/drink/list/`,{
            headers: {
              Authorization: `Bearer ${keycloak.token}`
            }
          }).then((response) => {
            setDrinks(response.data);
          });
        }else{
          axios.get(`http://localhost:8084/api/drink/list/${searchDrinkName}`,{
            headers: {
              Authorization: `Bearer ${keycloak.token}`
            }
          }).then((response) => {
            setDrinks(response.data);
          });
        }
    
    },[searchDrinkName]);

    const addPromotionDrink = (promotionName,numberOfDrinks,priceOfPromotion,drinkId) =>{
        axios.post('http://localhost:8084/api/promo/create/',{
            promotionName: promotionName,
            numberOfDrinks: numberOfDrinks,
            priceOfPromotion: priceOfPromotion,
            drinkId: drinkId,
        },{
            headers: {
              Authorization: `Bearer ${keycloak.token}`
            }
          }).then((response) => {
            setPromotionDrinks([response.data,...promotionDrinks]);
            setPromotionName('');
            setNumberOfDrinks('');
            setPriceOfPromotion('');
            setDrinkId('');
            navigate('/promotion', { replace: true });
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
                    <p>ONGEZA PROMOTION</p>
                </div>
                <div className="botton-side">
                    <form onSubmit={handleSubmit} class="input-form">
                        <div className="in-input">
                            <p className="message-box"><a className="message" href="#">{error}</a></p>
                        </div>
                        <div className="in-input">
                            <i className="fa-solid fa-envelope"></i>
                            <input type="search"  placeholder="Tafuta kinywaji..." onChange={(e) => setSearchDrinkName(e.target.value)}/>
                            <select name="" id="" onChange={(e) => setDrinkId(e.target.value) } required>
                                <option value="">Chagua Kinyw..</option>
                                {
                                    drinks.map((drink) => {
                                        return <option key={drink.id} value={drink.id}>{drink.drinkName}</option>
                                    })
                                }
                                
                            </select>
                        </div>
                        <div className="in-input">
                            <i className="fa-solid fa-envelope"></i>
                            <input type="text"  placeholder="JINA LA PROMOTION" onChange={(e) => setPromotionName(e.target.value)} required/>
                        </div>
                        <div className="in-input">
                            <i className="fa-solid fa-lock"></i>
                            <input type="number"  placeholder="IDADI YA VINYWAJI" onChange={(e) => setNumberOfDrinks(e.target.value)} required/>
                        </div>
                        <div className="in-input">
                            <i className="fa-solid fa-lock"></i>
                            <input type="number"  placeholder="BEI YA PROMOTION" onChange={(e) => setPriceOfPromotion(e.target.value)} required/>
                        </div>
                        <div className="in-input-text">
                            <button type="submit">ONGEZA</button>
                        </div>
                        <div className="in-input-text">
                            <Link to="/promotion" className='cancelBtn'><button type="reset">GHAIRI</button></Link>
                        </div>
                        
                    </form>
                </div>
    
            </div>
        </div>
        </>
  )
}
