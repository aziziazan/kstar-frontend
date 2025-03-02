import React, { useState,useEffect } from 'react'
import './DrinkTable.css'
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web';



export const DrinkTable = ({drinkName}) => {
   const [drinks, setDrinks] = useState([]);
   const navigate = useNavigate();
   let content = <p>Inatafuta........</p>;
   const { keycloak, initialized } = useKeycloak();
   



  useEffect(() => {
    if(drinkName == ''){
      axios.get(`http://localhost:8084/api/drink/list/`,{
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      }).then((response) => {
        setDrinks(response.data);
      });
    }else{
      axios.get(`http://localhost:8084/api/drink/list/${drinkName}`,{
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      }).then((response) => {
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
          <th>VINYWAJI VILIVYOPO</th>
          <th>BEI YA KUUZA</th>
          <th>OFFER</th>
          { (keycloak.hasResourceRole('manager') ||  keycloak.hasResourceRole('admin')) && <th>BEI YA KUNUNUA</th>}
          { (keycloak.hasResourceRole('manager') ||  keycloak.hasResourceRole('admin')) && <th colSpan="2">MATENDO</th>}
        </tr>
      </thead>
      <tbody>

        {drinks.map((drink) => {
          return(
            <tr key={drink.id}>
            <td>{drink.drinkName.toUpperCase()}</td>
            <td>{drink.drinkAvailable}</td>
            <td>{drink.drinkPrice.toLocaleString('en')}</td>
             <td>{(drink.hasPromotion == 1) && 'Offer'}</td>
            <td>{ (keycloak.hasResourceRole('manager') ||  keycloak.hasResourceRole('admin')) && drink.drinkBuyingPrice}</td>
            <td>{ (keycloak.hasResourceRole('manager') ||  keycloak.hasResourceRole('admin')) && <button onClick={() => deleteDrink(drink.id)}>FUTA</button>}</td>
            <td>{(keycloak.hasResourceRole('manager') ||  keycloak.hasResourceRole('admin')) &&<button onClick={() => updateDrink(drink.id)}>HUISHA</button>}</td>
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
            {(keycloak.hasResourceRole('manager') ||  keycloak.hasResourceRole('admin')) && <Link to="/drinks/add-drink">ONGEZA KINYWAJI</Link>}
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
