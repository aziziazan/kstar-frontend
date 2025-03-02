import React from 'react'
import { useEffect,useState } from 'react';
import { useNavigate, Link, replace } from 'react-router-dom';
import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';

export const DeletePromotionForm = ({promotionId}) => {
      const [promotionDrinks,setPromotionDrinks] = useState([]);
      const [error,setError] = useState('');
      const navigate = useNavigate();
      const { keycloak, initialized } = useKeycloak();

      useEffect(() => {

        axios.get(`http://localhost:8084/api/promo/find/${promotionId}`,{
            headers: {
              Authorization: `Bearer ${keycloak.token}`
            }
          }).then((response) => {
           setPromotionDrinks(response.data);
        }).catch((error) => {
            setError(error.message);
        });

    
    },[promotionId]);
    
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        deletePromotion(promotionId)

        navigate('/promotion', { replace: true });

    }


    const deletePromotion = (promotionId) => {
        axios.delete(`http://localhost:8084/api/promo/delete/${promotionId}`,{
            headers: {
              Authorization: `Bearer ${keycloak.token}`
            }
          }
        )
        .catch((error) => {
            setError(error.message);
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
                <p>ONDOA OFA</p>
            </div>
            <div className="botton-side">
                <form onSubmit={handleSubmit} class="input-form">
                    <div className="in-input">
                        <p className="message-box"><a className="message" href="#">{error}</a></p>
                    </div>

                    <div className="in-input">
                        <i className="fa-solid fa-envelope"></i>
                        <input type="text"  placeholder="IDADI" value={"Unafuta ofa ya "+promotionDrinks.drinkName+"?"}/>
                    </div>

                    <div className="in-input-text">
                        <button type="submit">FUTA</button>
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
