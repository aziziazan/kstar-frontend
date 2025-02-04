import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

export const ImportDrinkAddForm = () => {
    const [noOfDrinksAdded,setNoOfDrinksAdded] = useState('');
    const [totalCost,setTotalCost] = useState('');
    const [managerId,setManagerId] = useState(1);
    const [drinkId,setDrinkId] = useState('');

    const [importDrinks,setImportDrinks] = useState([]);
    const [drinks, setDrinks] = useState([]);

    const [error,setError] = useState('');
    const navigate = useNavigate();
    const [searchDrinkName,setSearchDrinkName] = useState('');

    
    
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        addImportDrink(noOfDrinksAdded,totalCost,managerId,drinkId);
    
    }

    useEffect(() => {
        if(searchDrinkName == ''){
          axios.get(`http://localhost:8085/api/drink/list/`).then((response) => {
            setDrinks(response.data);
          });
        }else{
          axios.get(`http://localhost:8085/api/drink/list/${searchDrinkName}`).then((response) => {
            setDrinks(response.data);
          });
        }
    
    },[searchDrinkName]);

    const addImportDrink = (noOfDrinksAdded,totalCost,managerId,drinkId) =>{
        axios.post('http://localhost:8086/api/import-drink/create/',{
            noOfDrinksAdded: noOfDrinksAdded,
            totalCost: totalCost,
            managerId: managerId,
            drinkId: drinkId,
        }).then((response) => {
            setImportDrinks([response.data,...importDrinks]);
            setNoOfDrinksAdded('');
            setTotalCost('');
            setManagerId('');
            setDrinkId('');
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
                <p>ONGEZA KIYWAJI</p>
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
                        <input type="number"  placeholder="IDADI" onChange={(e) => setNoOfDrinksAdded(e.target.value)} required/>
                    </div>
                    <div className="in-input">
                        <i className="fa-solid fa-lock"></i>
                        <input type="number"  placeholder="JUMLA YA GHARAMA" onChange={(e) => setTotalCost(e.target.value)} required/>
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
