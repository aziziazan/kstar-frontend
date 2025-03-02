import React, { useEffect, useState } from 'react';
import './SoldDrinkTable.css';
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';

export const RemainDrinks = ({searchName}) => {
    const [soldDrinks,setSoldDrinks] = useState([]);
    const navigate = useNavigate();
    let content = <p>Inatafuta........</p>;
    const { keycloak, initialized } = useKeycloak();
  


    useEffect(() => {
      if(searchName == ''){
        axios.get(`http://localhost:8084/api/solid-drink/list-remain-drink/`,{
          headers: {
            Authorization: `Bearer ${keycloak.token}`
          }
        }).then((response) => {
           setSoldDrinks(response.data);
        });
      }else{
        axios.get(`http://localhost:8084/api/solid-drink/list-remain-drink/${searchName}`,{
          headers: {
            Authorization: `Bearer ${keycloak.token}`
          }
        }).then((response) => {
           setSoldDrinks(response.data);
        });
      }
    },[searchName]);
    

    if(soldDrinks != ""){
      content = (
        <table className='table'>
            <thead>
              <tr>
                <th>JINA LA KINYWAJI</th>
                <th>JUMLA VILIVYOKUWEPO</th>
                <th>VILIVYOUZWA</th>
                <th>BAKI</th>
                <th>IMEANDALIWA NA</th>
              </tr>
            </thead>
            <tbody>
      
              {soldDrinks.map((soldDrink) => {
                return(
                  <tr key={soldDrink.id}>
                  <td>{soldDrink.drinkName}</td>
                  <td>{soldDrink.totalDrinks}</td>
                  <td>{soldDrink.soldDrinks}</td>
                  <td>{soldDrink.remainDrinks}</td>
                  <td>{soldDrink.createdBy}</td>
                  </tr>
                );
              })}

            </tbody>
          </table>
      )
    }else{
      content = <div className='NoDrinkBox'><h4>Hakuna baki ya vinywaji</h4></div>;
    }

  return (
     <>
        <div className='container'>
        <div className="table-header">
            <div className='other'>
              <p>{searchName}</p>
            </div>
            <div className='title'>
                <h3>ORODHA YA YA VINYWAJI VILIVYOBAKI</h3>
            </div>
            <div className='action'>
                
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
