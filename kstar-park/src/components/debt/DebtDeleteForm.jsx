import { useState,useEffect } from 'react'
import React from 'react'
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';

export const DebtDeleteForm = ({debtId}) => {
    const navigate = useNavigate();
    const [debtAmount,setDebtAmount] = useState('');
    const [error,setError] = useState('');
    const { keycloak, initialized } = useKeycloak();

    useEffect(() => {
      axios.get(`http://localhost:8084/api/debt/find-debt/${debtId}`,{
          headers: {
            Authorization: `Bearer ${keycloak.token}`
          }
        }).then((response) => {
          setDebtAmount(response.data.debtAmount);
      }).catch((error) => {
          setError(error.message);
      });
    }, [debtId]);
  
  const handleSubmit = (e) =>{
      e.preventDefault();
      deleteDebt(debtId);
      navigate('/debt', { replace: true });
  }
  

  const deleteDebt = (debtId) => {
      axios.delete(`http://localhost:8084/api/debt/delete-debt/${debtId}`,{
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
                    <p>FUTA DENI</p>
                </div>
                <div class="botton-side">
                    <form onSubmit={handleSubmit} class="input-form">
                        <div class="in-input">
                            <p class="message-box"><a className="message" href="#">{error}</a></p>
                        </div>
                        <div className="in-input">
                            <i className="fa-solid fa-envelope"></i>
                            <input type="text" value={'Unahitaji kufuta deni la '+debtAmount+'?'} placeholder="KIASI CHA DENI"/>
                        </div>
                        <div className="in-input-text">
                            <button type="submit">NDIO</button>
                        </div>
                        <div class="in-input-text">
                            <Link to="/debt" className='cancelBtn'><button type="reset">GHAIRI</button></Link>
                        </div>
                        
                    </form>
                </div>
    
            </div>
        </div>
        </>
  )
}
