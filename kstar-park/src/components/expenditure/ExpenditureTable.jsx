import React from 'react'
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom'
import './ExpenditureTable.css'
import { useState,useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';

export const ExpenditureTable = ({searchDate}) => {
    const [expenditures, setExpenditures] = useState([]);
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
           setDailSummary(response.data.totalExpenses);
        });
      }else{
        axios.get(`http://localhost:8084/api/summary/get-current-summary/${searchDate}`,{
          headers: {
            Authorization: `Bearer ${keycloak.token}`
          }
        }).then((response) => {
           setDailSummary(response.data.totalExpenses);
        });
      }

    }
 
 
 
 
   useEffect(() => {
    if(searchDate == ''){
      axios.get(`http://localhost:8084/api/expenditure/list-expenditure/`,{
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      }).then((response) => {
         setExpenditures(response.data);
       });
    }else{
      axios.get(`http://localhost:8084/api/expenditure/list-expenditure/${searchDate}`,{
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      }).then((response) => {
         setExpenditures(response.data);
       });
    }
  
   },[searchDate]);
 
 
 
   const updateExpenditure = (expenditureId) => {
     navigate(`/expenditure/update-expenditure/${expenditureId}`);
   }
 
   const deleteExpenditure = (expenditureId) => {
     navigate(`/expenditure/delete-expenditure/${expenditureId}`);
   }
 
 
 
   if(expenditures != ""){
    reloadSummary();
     content = (
       <table className='table'>
       <thead>
         <tr>
           <th>AINA YA MATUMIZI</th>
           <th>KIASI</th>
           <th>TAREHE</th>
           <th>IMETENGENEZWA NA</th>
           <th colSpan="2">MATENDO</th>
         </tr>
       </thead>
       <tbody>
 
         {expenditures.map((expenditure) => {
           return(
             <tr key={expenditure.id}>
             <td>{expenditure.expenditureCategoryName.toUpperCase()}</td>
             <td>{expenditure.amount.toLocaleString('en')}</td>
             <td>{expenditure.expenditureDate}</td>
             <td>{expenditure.createdBy}</td>
             <td><button onClick={() => deleteExpenditure(expenditure.id)}>FUTA</button></td>
             <td><button onClick={() => updateExpenditure(expenditure.id)}>HUISHA</button></td>
             </tr>
           );
         })}
 
       </tbody>
     </table>
     )
   }else{
     content = <div className='NoDrinkBox'><h4>Hakuna MATUMIZI chochote, bonyeza <Link to="/expenditure/add-expenditure">HAPA</Link> kuingiza</h4></div>
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
            <h3>ORODHA YA MATUMIZI</h3>
        </div>
        <div className='action'>
            <Link to="/expenditure/add-expenditure">INGIZA MATUMIZI</Link>
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
