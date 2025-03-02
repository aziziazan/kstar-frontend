import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

export const FloatUpdateForm = ({floatId}) => {
  const { keycloak, initialized } = useKeycloak();
  const [noOfDrinkFloat,setNoOfDrinkFloat] = useState('');
  const [description,setDescription] = useState('');
  const [createdBy,setCreatedBy] = useState('');
  const [drinkId,setDrinkId] = useState('');

  const [drinks, setDrinks] = useState([]);
  const [floats,setFloats] = useState([]);
  
  const [error,setError] = useState('');
  const navigate = useNavigate();


  useEffect(() => {

    axios.get(`http://localhost:8084/api/drink-float/find-float/${floatId}`,{
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      }).then((response) => {
       setNoOfDrinkFloat(response.data.noOfDrinkFloat);
       setDescription(response.data.description);
       setCreatedBy(response.data.createdBy);
       setDrinkId(response.data.drinkId);
       
       axios.get(`http://localhost:8084/api/drink/list/`,{
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
       }).then((response) => {
        setDrinks(response.data);
      }).catch((error) => {
        setError(error.message);
      });

     }).catch((error) => {
        setError(error.message);
     });
    },[floatId]);

  const handleSubmit = (e) =>{
    e.preventDefault();
    setCreatedBy(keycloak.tokenParsed.preferred_username);
    updateFloatDrink(floatId,noOfDrinkFloat,description,createdBy,drinkId);

  }

  const updateFloatDrink = (floatId,noOfDrinkFloat,description,createdBy,drinkId) =>{
    axios.put('http://localhost:8084/api/drink-float/update-float/',{
        id: floatId,
        noOfDrinkFloat: noOfDrinkFloat, 
        description: description,
        createdBy: createdBy,
        drinkId: drinkId,
    },{
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      }).then((response) => {
        setFloats([response.data,...floats]);
        navigate('/float', { replace: true });
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
                        <p>HUISHA FLOAT</p>
                    </div>
                    <div className="botton-side">
                        <form onSubmit={handleSubmit} class="input-form">
                            <div className="in-input">
                                <p className="message-box"><a className="message" href="#">{error}</a></p>
                            </div>
                            <div className="in-input">
                                <i className="fa-solid fa-envelope"></i>
                                <input type="search"  placeholder="Tafuta kinywaji..." onChange={(e) => setSearchDrinkName(e.target.value)}/>
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
                                <input type="number"  placeholder="IDADI YA FLOAT" value={noOfDrinkFloat} onChange={(e) => setNoOfDrinkFloat(e.target.value)} required/>
                            </div>
                            <div className="in-input">
                                <i className="fa-solid fa-envelope"></i>
                                <input type="text-area"  placeholder="MAELEZO" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                            </div>
                            <div className="in-input-text">
                                <button type="submit">HUISHA</button>
                            </div>
                            <div className="in-input-text">
                                <Link to="/float" className='cancelBtn'><button type="reset">GHAIRI</button></Link>
                            </div>
                            
                        </form>
                    </div>
        
                </div>
            </div>
            </>
  )
}
