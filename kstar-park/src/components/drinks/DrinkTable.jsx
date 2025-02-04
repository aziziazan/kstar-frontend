import React, { useState,useEffect } from 'react'
import './DrinkTable.css'
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom'



export const DrinkTable = ({drinkName}) => {
   const [drinks, setDrinks] = useState([]);
   const navigate = useNavigate();
   let content = <p>Inatafuta........</p>;

  useEffect(() => {
    
    if(drinkName == ''){
      axios.get(`http://localhost:8085/api/drink/list/`).then((response) => {
        setDrinks(response.data);
      });
    }else{
      axios.get(`http://localhost:8085/api/drink/list/${drinkName}`).then((response) => {
        setDrinks(response.data);
      });
    }
 
  },[drinkName]);



  const updateDrink = (drinkId) => {
    navigate(`/drinks/update-drink/${drinkId}`);
  }

  const deleteDrink = (drinkId) => {
    navigate(`/drinks/delete-drink/${drinkId}`);
  }



  if(drinks != ""){
    content = (
      <table className='table'>
      <thead>
        <tr>
          <th>JINA LA KINYWAJI</th>
          <th>BEI YAKE</th>
          <th>JUMLA YA VILIVYOINGIA</th>
          <th>JUMLA YA VILIVYOUZWA</th>
          <th>VILIVYOPO SASA</th>
          <th colSpan="2">MATENDO</th>
        </tr>
      </thead>
      <tbody>

        {drinks.map((drink) => {
          return(
            <tr key={drink.id}>
            <td>{drink.drinkName}</td>
            <td>{drink.drinkPrice}</td>
            <td>{drink.totalImportedDrinks}</td>
            <td>{drink.totalSoldDrinks}</td>
            <td>{drink.drinkAvailable}</td>
            <td><button onClick={() => deleteDrink(drink.id)}>FUTA</button></td>
            <td><button onClick={() => updateDrink(drink.id)}>HUISHA</button></td>
            </tr>
          );
        })}

      </tbody>
    </table>
    )
  }else{
    content = <div className='NoDrinkBox'><h4>Hakuna Kinywaji chochote, bonyeza <Link to="/drinks/add-drink">HAPA</Link> kuongeza</h4></div>
  }

  return (
    <>
    <div className='container'>
    <div className="table-header">
        <div className='other'>
            <p>{drinkName}</p>
        </div>
        <div className='title'>
            <h3>ORODHA YA VINYWAJI</h3>
        </div>
        <div className='action'>
            <Link to="/drinks/add-drink">ONGEZA KINYWAJI</Link>
        </div>
    </div>
    <section>

      { content }

    </section>
    <div className="down-cont">

    </div>
    </div>
    </>

  )
}
