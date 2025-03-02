import React, { useEffect, useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';

export const ProfitTable = ({searchDate}) => {
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
           setDailSummary(response.data.profit);
        });
      }else{
        axios.get(`http://localhost:8084/api/summary/get-current-summary/${searchDate}`,{
          headers: {
            Authorization: `Bearer ${keycloak.token}`
          }
        }).then((response) => {
           setDailSummary(response.data.profit);
        });
      }

    }


    useEffect(() => {
      if(searchDate == ''){
        axios.get('http://localhost:8084/api/solid-drink/list-sold-drink/',{
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
    
    const updateBuyingPrice = (soldDrinkId) => {
      navigate(`/profit/update-price/${soldDrinkId}`);
    }

    if(soldDrinks != ""){
      reloadSummary();
      content = (
        <table className='table'>
            <thead>
              <tr>
                <th>JINA LA KINYWAJI</th>
                <th>VILIVYOUZWA</th>
                <th>BEI</th>
                <th>KIASI</th>
                <th>BEI YA KUCHUKULIA KILA MOJA</th>
                <th>FAIDA</th>
              </tr>
            </thead>
            <tbody className='table-body'>
      
              {soldDrinks.map((soldDrink) => {
                return(
                  <tr key={soldDrink.id}>
                  <td>{soldDrink.drinkName.toUpperCase()}</td>
                  <td>{soldDrink.soldDrinks}</td>
                  <td>{soldDrink.drinkPrice}</td>
                  <td>{soldDrink.amount}</td>
                  <td>{soldDrink.buyingPrice}</td>
                  <td>{soldDrink.profitOfSoldDrink}</td>
                  </tr>
                );
              })}

            </tbody>
          </table>
      )
    }else{
      content = <div className='NoDrinkBox'><h4>Hakuna baki ya vinywaji iliyojanzwa leo, hivyo hakuna taarifa ya faida.</h4></div>;
    }

    if(dailySummary != ""){
      dailySummaryContent = <p>Jumla: <span className='summary'>Tsh {dailySummary}</span></p>;
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
                <h3>ORODHA YA FAIDA YA MAUZO</h3>
            </div>
            <div className='action'>
            
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
