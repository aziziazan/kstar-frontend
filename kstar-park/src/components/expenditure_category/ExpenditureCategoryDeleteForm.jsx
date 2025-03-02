import { useState,useEffect } from 'react'
import React from 'react'
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';

export const ExpenditureCategoryDeleteForm = ({categoryExpenditureId}) => {
  const navigate = useNavigate();
  const [expenditureCategoryName,setExpenditureCategoryName] = useState('');
  const [error,setError] = useState('');
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
      axios.get(`http://localhost:8084/api/category/find-category/${categoryExpenditureId}`,{
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      }).then((response) => {
          setExpenditureCategoryName(response.data.expenditureName);
      }).catch((error) => {
          setError(error.message);
      });
  }, [categoryExpenditureId]);
  
  const handleSubmit = (e) =>{
      e.preventDefault();
      deleteExpenditureCategory(categoryExpenditureId);
      navigate('/expenditure_category');
  }
  

  const deleteExpenditureCategory = (categoryExpenditureId) => {
      axios.delete(`http://localhost:8084/api/category/delete-category/${categoryExpenditureId}`,{
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
                <p>FUTA KIYWAJI</p>
            </div>
            <div class="botton-side">
                <form onSubmit={handleSubmit} class="input-form">
                    <div class="in-input">
                        <p class="message-box"><a className="message" href="#">{error}</a></p>
                    </div>
                    <div className="in-input">
                        <i className="fa-solid fa-envelope"></i>
                        <input type="text" value={'Unahitaji kufuta '+expenditureCategoryName+'?'} placeholder="JINA LA KINYWAJI"/>
                    </div>
                    <div className="in-input-text">
                        <button type="submit">NDIO</button>
                    </div>
                    <div class="in-input-text">
                        <Link to="/expenditure_category" className='cancelBtn'><button type="reset">GHAIRI</button></Link>
                    </div>
                    
                </form>
            </div>

        </div>
    </div>
    </>
  )
}
