import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

export const FloatAddForm = () => {
      const { keycloak, initialized } = useKeycloak();
      const [noOfDrinkFloat,setNoOfDrinkFloat] = useState('');
      const [description,setDescription] = useState('');
      const [createdBy,setCreatedBy] = useState(keycloak.tokenParsed.preferred_username);
      const [drinkId,setDrinkId] = useState('');
  
      const [floats,setFloats] = useState([]);
      const [drinks, setDrinks] = useState([]);
  
      const [error,setError] = useState('');
      const navigate = useNavigate();
      const [searchDrinkName,setSearchDrinkName] = useState('');
      


      const handleSubmit = (e) =>{
        e.preventDefault();
        addDrinkFloat(noOfDrinkFloat,description,createdBy,drinkId);
        console.log(createdBy);
    
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

    const addDrinkFloat = (noOfDrinkFloat,description,createdBy,drinkId) =>{
        axios.post('http://localhost:8084/api/drink-float/add-float/',{
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
            setNoOfDrinkFloat('');
            setDescription('');
            setCreatedBy('');
            setDrinkId('');
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
                    <p>INGIZA FLOAT</p>
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
                            <input type="number"  placeholder="IDADI YA FLOAT" onChange={(e) => setNoOfDrinkFloat(e.target.value)} required/>
                        </div>
                        <div className="in-input">
                            <i className="fa-solid fa-envelope"></i>
                            <input type="text-area"  placeholder="MAELEZO" onChange={(e) => setDescription(e.target.value)} required/>
                        </div>
                        <div className="in-input-text">
                            <button type="submit">INGIZA</button>
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
