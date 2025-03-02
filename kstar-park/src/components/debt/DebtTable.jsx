import React, { useState,useEffect } from 'react'
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web';

export const DebtTable = ({searchDate}) => {
      const [debts,setDebts] = useState([]);
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
             setDailSummary(response.data.totalDebt);
          });
        }else{
          axios.get(`http://localhost:8084/api/summary/get-current-summary/${searchDate}`,{
            headers: {
              Authorization: `Bearer ${keycloak.token}`
            }
          }).then((response) => {
             setDailSummary(response.data.totalDebt);
          });
        }
    }


    useEffect(() => {
      if(searchDate == ''){
        axios.get(`http://localhost:8084/api/debt/list-debt/`,{
          headers: {
            Authorization: `Bearer ${keycloak.token}`
          }
        }).then((response) => {
           setDebts(response.data);
        });
      }else{
        axios.get(`http://localhost:8084/api/debt/list-debt/${searchDate}`,{
          headers: {
            Authorization: `Bearer ${keycloak.token}`
          }
        }).then((response) => {
           setDebts(response.data);
        });
      }
    },[searchDate]);
    
    const updateDebt = (debtId) => {
      navigate(`/debt/update-debt/${debtId}`);
    }

    const deleteDebt = (debtId) => {
      navigate(`/debt/delete-debt/${debtId}`);
    }

    if(debts != ""){
      reloadSummary();
      content = (
        <table className='table'>
            <thead>
              <tr>
                <th>TAREHE</th>
                <th>KIASI</th>
                <th>MAELEZO</th>
                <th>IMETENGENEZWA NA</th>
                <th colSpan="2">MATENDO</th>
              </tr>
            </thead>
            <tbody>
      
              {debts.map((debt) => {
                return(
                  <tr key={debt.id}>
                  <td>{debt.debtDate}</td>
                  <td>{debt.debtAmount.toLocaleString('en')}</td>
                  <td>{debt.description}</td>
                  <td>{debt.createdBy}</td>
                  <td><button onClick={() => updateDebt(debt.id)}>HUISHA</button></td>
                  <td><button onClick={() => deleteDebt(debt.id)}>FUTA</button></td>
                  </tr>
                );
              })}

            </tbody>
          </table>
      )
    }else{
      content = <div className='NoDrinkBox'><h4>Hakuna madeni yaliyojanzwa leo, bonyeza <Link to="/debt/add-debt">HAPA</Link> kuingiza madeni</h4></div>;
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
                <h3>ORODHA YA MADENI</h3>
            </div>
            <div className='action'>
                <Link to="/debt/add-debt">ONGEZA MADENI</Link>
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
