import React, { useEffect, useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';

export const SummaryTable = () => {
        const [dailySummaries,setDailSummaries] = useState('');
        const navigate = useNavigate();
        let dailySummaryContent;
        const { keycloak, initialized } = useKeycloak();

        useEffect(() => {
            axios.get(`http://localhost:8084/api/summary/list-summary/`,{
                headers: {
                  Authorization: `Bearer ${keycloak.token}`
                }
              }).then((response) => {
                 setDailSummaries(response.data);
              });
        },[]);
        
        if(dailySummaries != ""){
          dailySummaryContent = (
            <table className='table'>
                <thead>
                  <tr>
                    <th>TAREHE</th>
                    <th>JUMLA YA MAUZO</th>
                    <th>JUMLA YA MATUMIZI</th>
                    <th>JUMLA YA HASARA YA FLOAT</th>
                    <th>JUMLA YA MADENI</th>
                    <th>CASH</th>
                    { (keycloak.hasResourceRole('manager') ||  keycloak.hasResourceRole('admin')) && <th>FAIDA</th>}
                  </tr>
                </thead>
                <tbody>
          
                  {dailySummaries.map((dailySummary) => {
                    return(
                      <tr key={dailySummary.id}>
                      <td>{dailySummary.summaryDate}</td>
                      <td>{dailySummary.totalIncome.toLocaleString('en')}</td>
                      <td>{dailySummary.totalExpenses.toLocaleString('en')}</td>
                      <td>{dailySummary.totalFloatLoss.toLocaleString('en')}</td>
                      <td>{dailySummary.totalDebt.toLocaleString('en')}</td>
                      <td>{dailySummary.netIncome.toLocaleString('en')}</td>
                      <td>{ (keycloak.hasResourceRole('manager') ||  keycloak.hasResourceRole('admin')) && dailySummary.profit.toLocaleString('en')}</td>
                      </tr>
                    );
                  })}
    
                </tbody>
              </table>
          )
        }else{
          dailySummaryContent = <div className='NoDrinkBox'><h4>Hakuna baki ya vinywaji iliyojanzwa leo, bonyeza <Link to="/sold/add-drink">HAPA</Link> kujaza baki</h4></div>;
        }

  return (
     <>
        <div className='container'>
        <div className="table-header">
            <div className='other'>
        
            </div>
            <div className='title'>
                <h3>TAARIFA ZA MAUZO YA KILA SIKU</h3>
            </div>
            <div className='action'>
                <Link to="/sold/add-drink"></Link>
            </div>
        </div>
        <section>
             { dailySummaryContent}   
          
        </section>
        <div className="down-cont">
        
        </div>
        </div>
        </>
  )
}
