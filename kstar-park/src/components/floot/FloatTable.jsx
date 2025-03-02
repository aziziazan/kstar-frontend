import React, { useState,useEffect } from 'react'
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web';

export const FloatTable = ({searchDate}) => {
  const [floats,setFloats] = useState([]);
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
         setDailSummary(response.data.totalFloatLoss);
      });
    }else{
      axios.get(`http://localhost:8084/api/summary/get-current-summary/${searchDate}`,{
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      }).then((response) => {
         setDailSummary(response.data.totalFloatLoss);
      });
    }
    
}


useEffect(() => {
  if(searchDate == ''){
    axios.get(`http://localhost:8084/api/drink-float/list-float/`,{
      headers: {
        Authorization: `Bearer ${keycloak.token}`
      }
    }).then((response) => {
       setFloats(response.data);
    });
  }else{
    axios.get(`http://localhost:8084/api/drink-float/list-float/${searchDate}`,{
      headers: {
        Authorization: `Bearer ${keycloak.token}`
      }
    }).then((response) => {
       setFloats(response.data);
    });
  }
},[searchDate]);

const updateDrinkFloat = (drinkFloatId) => {
  navigate(`/float/update-float/${drinkFloatId}`);
}

const deleteDrinkFloat = (drinkFloatId) => {
  navigate(`/float/delete-float/${drinkFloatId}`);
}

if(floats != ""){
  reloadSummary();
  content = (
    <table className='table'>
        <thead>
          <tr>
            <th>JINA LA KINYWAJI</th>
            <th>BEI</th>
            <th>IDADI YA FLOAT</th>
            <th>KIASI CHA HASARA</th>
            <th>MAELEZO</th>
            <th>IMETENGENEZWA NA</th>
            <th colSpan="2">MATENDO</th>
          </tr>
        </thead>
        <tbody>
  
          {floats.map((float) => {
            return(
              <tr key={float.id}>
              <td>{float.drinkName.toUpperCase()}</td>
              <td>{float.drinkPrice.toLocaleString('en')}</td>
              <td>{float.noOfDrinkFloat}</td>
              <td>{float.lossAmount.toLocaleString('en')}</td>
              <td>{float.description}</td>
              <td>{float.createdBy}</td>
              <td><button onClick={() => updateDrinkFloat(float.id)}>HUISHA</button></td>
              <td><button onClick={() => deleteDrinkFloat(float.id)}>FUTA</button></td>
              </tr>
            );
          })}

        </tbody>
      </table>
  )
}else{
  content = <div className='NoDrinkBox'><h4>Hakuna float iliyojanzwa leo, bonyeza <Link to="/float/add-float">HAPA</Link> kuingiza float</h4></div>;
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
                    <h3>ORODHA YA FLOAT</h3>
                </div>
                <div className='action'>
                    <Link to="/float/add-float">ONGEZA FLOAT</Link>
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
