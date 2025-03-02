import React, { useEffect, useState } from 'react';
import './ImportDrinkTable.css';
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';

export const ImportDrinkTable = ({searchDate}) => {
    const [importDrinks,setImportDrinks] = useState([]);
    const navigate = useNavigate();
    let content = <p>Inatafuta........</p>;
    const { keycloak, initialized } = useKeycloak();




    useEffect(() => {
      if(searchDate == ''){
        axios.get(`http://localhost:8084/api/import-drink/list-import-drink/`,{
          headers: {
            Authorization: `Bearer ${keycloak.token}`
          }
        }).then((response) => {
           setImportDrinks(response.data);
        });
      }else{
        axios.get(`http://localhost:8084/api/import-drink/list-import-drink/${searchDate}`,{
          headers: {
            Authorization: `Bearer ${keycloak.token}`
          }
        }).then((response) => {
           setImportDrinks(response.data);
        });
      }
 
    },[searchDate]);

    const updateImportDrink = (importDrinkId) => {
      navigate(`/import/update-import-drink/${importDrinkId}`);
    }
    
    const deleteImportDrink = (importDrinkId) => {
      navigate(`/import/delete-import-drink/${importDrinkId}`);
    }

    if(importDrinks != ""){
      content = (
        <table className='table'>
            <thead>
              <tr>
                <th>JINA LA KINYWAJI</th>
                <th>IDADI</th>
                <th>JUMLA YA GHARAMA</th>
                <th>GHARAMA KWA KILA MOJA</th>
                { (keycloak.hasResourceRole('manager') ||  keycloak.hasResourceRole('admin')) && <th colSpan="2">MATENDO</th>}
              </tr>
            </thead>
            <tbody>
      
              {importDrinks.map((importDrink) => {
                return(
                  <tr key={importDrink.id}>
                  <td>{importDrink.drinkName.toUpperCase()}</td>
                  <td>{importDrink.noOfDrinksAdded}</td>
                  <td>{importDrink.totalCost.toLocaleString('en')}</td>
                  <td>{importDrink.costOfEachDrink.toLocaleString('en')}</td>
                  <td>{ (keycloak.hasResourceRole('manager') ||  keycloak.hasResourceRole('admin')) && <button onClick={() => deleteImportDrink(importDrink.id)}>FUTA</button>}</td>
                  <td>{ (keycloak.hasResourceRole('manager') ||  keycloak.hasResourceRole('admin')) && <button onClick={() => updateImportDrink(importDrink.id)}>HUISHA</button>}</td>
                  </tr>
                );
              })}

            </tbody>
          </table>
      )
    }else{
      content = <div className='NoDrinkBox'><h4>Hakuna Kinywaji chochote, bonyeza <Link to="/import/add-drink">HAPA</Link> kuingiza</h4></div>;
    }


  return (
    <>
    <div className='container'>
    <div className="table-header">
        <div className='other'>
          <p>{searchDate}</p>
        </div>
        <div className='title'>
            <h3>ORODHA YA VINYWAJI VILIVYOINGIA</h3>
        </div>
        <div className='action'>
            { (keycloak.hasResourceRole('manager') ||  keycloak.hasResourceRole('admin')) && <Link to="/import/add-drink">INGIZA KINYWAJI</Link>}
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
