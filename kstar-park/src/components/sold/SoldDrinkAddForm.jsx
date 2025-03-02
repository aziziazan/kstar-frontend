import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import './SoldDrinkAddForm.css'
import { useKeycloak } from '@react-keycloak/web';

export const SoldDrinkAddForm = () => {
  const { keycloak, initialized } = useKeycloak();
  const [remainDrinks,setRemainDrinks] = useState('');
  const [drinkId,setDrinkId] = useState('');
  const [createdBy,setCreatedBy] = useState(keycloak.tokenParsed.preferred_username);

  const [soldDrinks,setSoldDrinks] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const [error,setError] = useState('');
  const navigate = useNavigate();
  const [searchDrinkName,setSearchDrinkName] = useState('');

  
  
  
  const handleSubmit = (e) =>{
      e.preventDefault();
      addSoldDrink(remainDrinks,drinkId,createdBy);
  
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

  const addSoldDrink = (remainDrinks,drinkId,createdBy) => {
      axios.post(`http://localhost:8084/api/solid-drink/sell-drink/`,{
          remainDrinks: remainDrinks,
          drinkId: drinkId,
          createdBy: createdBy,
      },{
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      }).then((response) => {
          setSoldDrinks([response.data,...soldDrinks]);
          setRemainDrinks('');
          setDrinkId('');
          navigate('/sold');
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
                <p>INGIZA BAKI</p>
            </div>
            <div className="botton-side">
                <form onSubmit={handleSubmit} class="input-form">
                    <div className="in-input">
                        <p className="message-box"><a className="message" href="#">{error}</a></p>
                    </div>

                    <div className="in-input">
                        <i className="fa-solid fa-envelope"></i>
                        <input type="search"  placeholder="Tafuta kinywaji..." onChange={(e) => setSearchDrinkName(e.target.value)}/>
                    </div>

                    <div className="in-input">
                        <i className="fa-solid fa-envelope"></i>
                        <select name="" id="" onChange={(e) => setDrinkId(e.target.value) } required>
                            <option value="">Chagua Kinyw..</option>
                            {
                                drinks.map((drink) => {
                                    return <option key={drink.id} value={drink.id}>{drink.drinkName},{drink.drinkAvailable}</option>
                                })
                            }
                            
                        </select>
                    </div>
                
                    <div className="in-input">
                        <i className="fa-solid fa-envelope"></i>
                        <input type="number"  placeholder="BAKI" onChange={(e) => setRemainDrinks(e.target.value)} required/>
                    </div>
                    
                    <div className="in-input-text">
                        <button type="submit">INGEZA</button>
                    </div>
                    <div className="in-input-text">
                        <Link to="/sold" className='cancelBtn'><button type="reset">GHAIRI</button></Link>
                    </div>
                    
                </form>
            </div>

        </div>
    </div>
    </>
  )
}
