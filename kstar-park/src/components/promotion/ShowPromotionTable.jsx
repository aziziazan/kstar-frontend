import React, { useEffect, useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';

export const ShowPromotionTable = ({searchName}) => {
  const [promotionDrinks,setPromotionDrinks] = useState([]);
  const navigate = useNavigate();
  let content = <p>Inatafuta........</p>;
  const { keycloak, initialized } = useKeycloak();




  useEffect(() => {
    if(searchName == ''){
      axios.get(`http://localhost:8084/api/promo/list/`,{
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      }).then((response) => {
         setPromotionDrinks(response.data);
      });
    }else{
      axios.get(`http://localhost:8084/api/promo/list/${searchName}`,{
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      }).then((response) => {
         setPromotionDrinks(response.data);
      });
    }

  },[searchName]);

  const updateImportDrink = (promotionId) => {
    navigate(`/promotion/update-promotion/${promotionId}`);
  }
  
  const deleteImportDrink = (promotionId) => {
    navigate(`/promotion/delete-promotion/${promotionId}`);
  }

  if(promotionDrinks != ""){
    content = (
      <table className='table'>
          <thead>
            <tr>
              <th>JINA LA PROMOTION</th>
              <th>KINYWAJI</th>
              <th>BEI YA PROMOTION</th>
              <th>IDADI YA VINYWAJI</th>
              { (keycloak.hasResourceRole('manager') ||  keycloak.hasResourceRole('admin')) && <th colSpan="2">MATENDO</th>}
            </tr>
          </thead>
          <tbody>
    
            {promotionDrinks.map((promotionDrink) => {
              return(
                <tr key={promotionDrink.id}>
                <td>{promotionDrink.promotionName.toUpperCase()}</td>
                <td>{promotionDrink.drinkName.toUpperCase()}</td>
                <td>{promotionDrink.priceOfPromotion.toLocaleString('en')}</td>
                <td>{promotionDrink.numberOfDrinks}</td>
                <td>{ (keycloak.hasResourceRole('manager') ||  keycloak.hasResourceRole('admin')) && <button onClick={() => deleteImportDrink(promotionDrink.id)}>FUTA</button>}</td>
                <td>{ (keycloak.hasResourceRole('manager') ||  keycloak.hasResourceRole('admin')) && <button onClick={() => updateImportDrink(promotionDrink.id)}>HUISHA</button>}</td>
                </tr>
              );
            })}

          </tbody>
        </table>
    )
  }else{
    content = <div className='NoDrinkBox'><h4>Hakuna Offer kwasasa, bonyeza <Link to="/promotion/add-promotion">HAPA</Link> kuingiza offer</h4></div>;
  }
  return (
    <>
    <div className='container'>
    <div className="table-header">
        <div className='other'>
          <p>{searchName}</p>
        </div>
        <div className='title'>
            <h3>ORODHA YA PROMOTION</h3>
        </div>
        <div className='action'>
            { (keycloak.hasResourceRole('manager') ||  keycloak.hasResourceRole('admin')) && <Link to="/promotion/add-promotion">INGIZA OFFER</Link>}
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
