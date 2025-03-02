import { useState,useEffect } from 'react'
import React from 'react'
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';

export const ExpenditureDeleteForm = ({expenditureId}) => {
  const navigate = useNavigate();
  const [expenditureName,setExpenditureName] = useState('');
  const [error,setError] = useState('');
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
      axios.get(`http://localhost:8084/api/expenditure/find/${expenditureId}`,{
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      }).then((response) => {
          setExpenditureName(response.data.expenditureCategoryName);
      }).catch((error) => {
          setError(error.message);
      });
  }, [expenditureId]);
  
  const handleSubmit = (e) =>{
      e.preventDefault();
      deleteExpenditure(expenditureId);
      navigate('/expenditure');
  }
  

  const deleteExpenditure = (expenditureId) => {
      axios.delete(`http://localhost:8084/api/expenditure/delete/${expenditureId}`,{
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      });
  };

  return (
    <>
    <div class="add-container">
        <div class="card-input">
            <div class="top-side">
                <a href="#" id="cancellogin"><i class="fa-sharp fa-solid fa-circle-xmark"></i></a>
            </div>
            <div class="middle-side">
                <p>FUTA MATUMIZI</p>
            </div>
            <div class="botton-side">
                <form onSubmit={handleSubmit} class="input-form">
                    <div class="in-input">
                        <p class="message-box"><a className="message" href="#">{error}</a></p>
                    </div>
                    <div className="in-input">
                        <i className="fa-solid fa-envelope"></i>
                        <input type="text" value={'Unahitaji kufuta '+expenditureName+'?'} placeholder="JINA LA KINYWAJI"/>
                    </div>
                    <div className="in-input-text">
                        <button type="submit">NDIO</button>
                    </div>
                    <div class="in-input-text">
                        <Link to="/expenditure" className='cancelBtn'><button type="reset">GHAIRI</button></Link>
                    </div>
                    
                </form>
            </div>

        </div>
    </div>
    </>
  )
}
