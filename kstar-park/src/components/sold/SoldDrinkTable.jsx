import React, { useEffect, useState } from 'react';
import './SoldDrinkTable.css';
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';

export const SoldDrinkTable = ({searchDate}) => {
    const [soldDrinks,setSoldDrinks] = useState([]);
    const [dailySummary,setDailSummary] = useState('');
    const navigate = useNavigate();
    let content = <p>Inatafuta........</p>;
    let dailySummaryContent;
    const { keycloak, initialized } = useKeycloak();
  

    const reloadSummary = () => {
      if(searchDate == ''){
        axios.get(`http://localhost:8084/api/summary/get-current-summary/`,{
          headers: {
            Authorization: `Bearer ${keycloak.token}`
          }
        }).then((response) => {
           setDailSummary(response.data.totalIncome);
        });
      }else{
        axios.get(`http://localhost:8084/api/summary/get-current-summary/${searchDate}`,{
          headers: {
            Authorization: `Bearer ${keycloak.token}`
          }
        }).then((response) => {
           setDailSummary(response.data.totalIncome);
        });
      }

    }


    useEffect(() => {
      if(searchDate == ''){
        axios.get(`http://localhost:8084/api/solid-drink/list-sold-drink/`,{
          headers: {
            Authorization: `Bearer ${keycloak.token}`
          }
        }).then((response) => {
           setSoldDrinks(response.data);
        });
      }else{
        axios.get(`http://localhost:8084/api/solid-drink/list-sold-drink/${searchDate}`,{
          headers: {
            Authorization: `Bearer ${keycloak.token}`
          }
        }).then((response) => {
           setSoldDrinks(response.data);
        });
      }

    },[searchDate]);
    
    const deleteSoldDrink = (soldDrinkId) => {
      navigate(`/sold/delete-sold-drink/${soldDrinkId}`);
    }

    if(soldDrinks != ""){
      reloadSummary();
      content = (
        <table className='table'>
            <thead>
              <tr>
                <th>JINA LA KINYWAJI</th>
                <th>JUMLA VILIVYOPO</th>
                <th>BAKI</th>
                <th>VILIVYOUZWA</th>
                <th>BEI</th>
                <th>KIASI</th>
                <th>IMEANDALIWA NA</th>
                <th colSpan="2">MATENDO</th>
              </tr>
            </thead>
            <tbody className='table-body'>
      
              {soldDrinks.map((soldDrink) => {
                return(
                  <tr key={soldDrink.id}>
                  <td>{soldDrink.drinkName.toUpperCase()}</td>
                  <td>{soldDrink.totalDrinks.toLocaleString('en')}</td>
                  <td>{soldDrink.remainDrinks}</td>
                  <td>{soldDrink.soldDrinks.toLocaleString('en')}</td>
                  <td>{soldDrink.drinkPrice.toLocaleString('en')}</td>
                  <td>{soldDrink.amount.toLocaleString('en')}</td>
                  <td>{soldDrink.createdBy}</td>
                  <td><button onClick={() => deleteSoldDrink(soldDrink.id)}>FUTA</button></td>
                  </tr>
                );
              })}

            </tbody>
          </table>
      )
    }else{
      content = <div className='NoDrinkBox'><h4>Hakuna baki ya vinywaji iliyojanzwa leo, bonyeza <Link to="/sold/add-drink">HAPA</Link> kujaza baki</h4></div>;
    }

    if(dailySummary != ""){
      dailySummaryContent = <p>Jumla: <span className='summary'>Tsh {dailySummary.toLocaleString('en')}</span></p>;
    }else{
      dailySummaryContent = <p></p>;
    }

  return (
    <>
    <div className='container'>
    <div className="table-header">
        <div className='other'>
          <p>{searchDate}</p>
        </div>
        <div className='title'>
            <h3>ORODHA YA VINYWAJI VILIVYOUZWA</h3>
        </div>
        <div className='action'>
            <Link to="/sold/add-drink">INGIZA BAKI</Link>
        </div>
    </div>
    <section>
         { content }   
      
    </section>
    <div className="down-cont">
      { dailySummaryContent }
    </div>
    </div>
    </>
  )
}
