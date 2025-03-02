import React from 'react'
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom'
import './ExpenditureCategoryTable.css'
import { useState ,useEffect} from "react";
import { useKeycloak } from '@react-keycloak/web';

export const ExpenditureCategoryTable = ({expenditureCategoryName}) => {
    const [expenditureCategories, setExpenditureCategories] = useState([]);
    const navigate = useNavigate();
    let content = <p>Inatafuta........</p>;
    const { keycloak, initialized } = useKeycloak();
 
 
 
 
   useEffect(() => {
     
     if(expenditureCategoryName == ''){
       axios.get(`http://localhost:8084/api/category/list/`,{
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      }).then((response) => {
         setExpenditureCategories(response.data);
       });
     }else{
       axios.get(`http://localhost:8084/api/category/list/${expenditureCategoryName}`,{
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      }).then((response) => {
         setExpenditureCategories(response.data);
       });
     }
  
   },[expenditureCategoryName]);
 
 
 
   const updateExpenditureCategory = (categoryExpenditureId) => {
     navigate(`/expenditure_category/update-expenditure_category/${categoryExpenditureId}`);
   }
 
   const deleteExpenditureCategory = (categoryExpenditureId) => {
     navigate(`/expenditure_category/delete-expenditure_category/${categoryExpenditureId}`);
   }
 
 
 
   if(expenditureCategories != ""){
     content = (
       <table className='table'>
       <thead>
         <tr>
           <th>JINA LA AINA YA MATUMIZI</th>
           <th>IMETENGENEZWA NA</th>
           <th colSpan="2">MATENDO</th>
         </tr>
       </thead>
       <tbody>
 
         {expenditureCategories.map((expenditureCategory) => {
           return(
             <tr key={expenditureCategory.id}>
             <td>{expenditureCategory.expenditureName.toUpperCase()}</td>
             <td>{expenditureCategory.createdBy}</td>
             <td><button onClick={() => deleteExpenditureCategory(expenditureCategory.id)}>FUTA</button></td>
             <td><button onClick={() => updateExpenditureCategory(expenditureCategory.id)}>HUISHA</button></td>
             </tr>
           );
         })}
 
       </tbody>
     </table>
     )
   }else{
     content = <div className='NoDrinkBox'><h4>Hakuna AINA YA MATUMIZI kwasasa, bonyeza <Link to="/expenditure_category/add-expenditure_category">HAPA</Link> kuingiza</h4></div>
   }

  return (
    <>
    <div className='container'>
    <div className="table-header">
        <div className='other'>
            <p></p>
        </div>
        <div className='title'>
            <h3>ORODHA YA AINA YA MATUMIZI</h3>
        </div>
        <div className='action'>
            <Link to="/expenditure_category/add-expenditure_category">INGIZA AINA YA MATUMIZI</Link>
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
