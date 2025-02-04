import React from 'react'
import { useEffect,useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export const ImportDrinkDeleteForm = ({importDrinkId}) => {
    const [importDrinks,setImportDrinks] = useState([]);
    const [drinkName,setDrinkName] = useState([]);
    const [error,setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

        axios.get(`http://localhost:8086/api/import-drink/find-import-drink/${importDrinkId}`).then((response) => {
           setImportDrinks(response.data);
           axios.get(`http://localhost:8085/api/drink/find/${response.data.drinkId}`).then((response) => {
            setDrinkName(response.data.drinkName);
           }).catch((error) => {
            setError(error.message);
           });
        }).catch((error) => {
            setError(error.message);
        });

    
    },[importDrinkId]);
    
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        deleteImportDrink(importDrinkId)
    }


    const deleteImportDrink = (importDrinkId) => {
        axios.delete(`http://localhost:8086/api/import-drink/delete-import-drink/${importDrinkId}`)
        .catch((error) => {
            setError(error.message);
        });
        navigate('/import');
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
                        <input type="text"  placeholder="IDADI" value={"Unafuta "+drinkName+" "+importDrinks.noOfDrinksAdded+"?"}/>
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
