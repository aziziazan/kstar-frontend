import React from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';

export const ImportDrinkUpdateForm = ({importDrinkId}) => {

  const [noOfDrinksAdded,setNoOfDrinksAdded] = useState('');
  const [totalCost,setTotalCost] = useState('');
  const [managerId,setManagerId] = useState(1);
  const [drinkId,setDrinkId] = useState('');

  const [drinks, setDrinks] = useState([]);
  const [importDrinks,setImportDrinks] = useState([]);
  
  const [error,setError] = useState('');
  const navigate = useNavigate();


  useEffect(() => {

    axios.get(`http://localhost:8086/api/import-drink/find-import-drink/${importDrinkId}`).then((response) => {
       setNoOfDrinksAdded(response.data.noOfDrinksAdded);
       setTotalCost(response.data.totalCost);
       setManagerId(response.data.managerId);
       setDrinkId(response.data.drinkId);
       
       axios.get(`http://localhost:8085/api/drink/list/`).then((response) => {
        setDrinks(response.data);

      }).catch((error) => {
        setError(error.message);
       });

    }).catch((error) => {
        setError(error.message);
    });


  },[importDrinkId]);

  const handleSubmit = (e) =>{
    e.preventDefault();
    updateImportDrink(importDrinkId,noOfDrinksAdded,totalCost,managerId,drinkId);

  }

  const updateImportDrink = (importDrinkId,noOfDrinksAdded,totalCost,managerId,drinkId) =>{
    axios.put('http://localhost:8086/api/import-drink/update-import-drink/',{
        id: importDrinkId,
        noOfDrinksAdded: noOfDrinksAdded, 
        totalCost: totalCost,
        managerId: managerId,
        drinkId: drinkId,
    }).then((response) => {
        setImportDrinks([response.data,...importDrinks]);
        navigate('/import');
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
                <p>HUISHA KIYWAJI</p>
            </div>
            <div className="botton-side">
                <form onSubmit={handleSubmit} class="input-form">
                    <div className="in-input">
                        <p className="message-box"><a className="message" href="#">{error}</a></p>
                    </div>
                    <div className="in-input">
                        <i className="fa-solid fa-envelope"></i>
                        <select name="" id="" value={drinkId} onChange={(e) => setDrinkId(e.target.value) } required>
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
                        <input type="number"  placeholder="IDADI" value={noOfDrinksAdded} onChange={(e) => setNoOfDrinksAdded(e.target.value)} required/>
                    </div>
                    <div className="in-input">
                        <i className="fa-solid fa-lock"></i>
                        <input type="number"  placeholder="JUMLA YA GHARAMA" value={totalCost} onChange={(e) => setTotalCost(e.target.value)} required/>
                    </div>
                    <div className="in-input-text">
                        <button type="submit">ONGEZA</button>
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

