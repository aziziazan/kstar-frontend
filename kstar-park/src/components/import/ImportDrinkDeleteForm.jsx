import React from 'react'
import { useEffect,useState } from 'react';
import { useNavigate, Link, replace } from 'react-router-dom';
import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';

export const ImportDrinkDeleteForm = ({importDrinkId}) => {
    const [importDrinks,setImportDrinks] = useState([]);
    const [error,setError] = useState('');
    const navigate = useNavigate();
    const { keycloak, initialized } = useKeycloak();

    useEffect(() => {

        axios.get(`http://localhost:8084/api/import-drink/find-import-drink/${importDrinkId}`,{
            headers: {
              Authorization: `Bearer ${keycloak.token}`
            }
          }).then((response) => {
           setImportDrinks(response.data);
        }).catch((error) => {
            setError(error.message);
        });

    
    },[importDrinkId]);
    
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        deleteImportDrink(importDrinkId)
    }


    const deleteImportDrink = (importDrinkId) => {
        axios.delete(`http://localhost:8084/api/import-drink/delete-import-drink/${importDrinkId}`,{
            headers: {
              Authorization: `Bearer ${keycloak.token}`
            }
          }
        )
        .catch((error) => {
            setError(error.message);
        });
        navigate('/import', { replace: true });
    };

  return (
    <>
    <div className="add-container">
        <div className="card-input">
            <div className="top-side">
                <a href="#" id="cancellogin"><i className="fa-sharp fa-solid fa-circle-xmark"></i></a>
            </div>
            <div className="middle-side">
                <p>FUTA KIYWAJI</p>
            </div>
            <div className="botton-side">
                <form onSubmit={handleSubmit} class="input-form">
                    <div className="in-input">
                        <p className="message-box"><a className="message" href="#">{error}</a></p>
                    </div>

                    <div className="in-input">
                        <i className="fa-solid fa-envelope"></i>
                        <input type="text"  placeholder="IDADI" value={"Unafuta "+importDrinks.drinkName+" "+importDrinks.noOfDrinksAdded+"?"}/>
                    </div>

                    <div className="in-input-text">
                        <button type="submit">FUTA</button>
                    </div>
                    <div className="in-input-text">
                        <Link to="/import" className='cancelBtn'><button type="reset">GHAIRI</button></Link>
                    </div>
                    
                </form>
            </div>

        </div>
    </div>
    </>
  )
}
