import React from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';

export const ExpenditureCategoryAddForm = () => {
  const { keycloak, initialized } = useKeycloak();
  const [categorykName,setCategorykName] = useState('');
  const [createdBy,setCreatedBy] = useState(keycloak.tokenParsed.preferred_username);

  const [expenditureCategory,setExpenditureCategory] = useState([]);
  const [error,setError] = useState('');
  const navigate = useNavigate();
  


  const handleSubmit = (e) =>{
      e.preventDefault();
      AddExpenditureCategory(categorykName,createdBy);
  }


  const AddExpenditureCategory = (categorykName,createdBy) =>{
      axios.post('http://localhost:8084/api/category/create/',{
        categorykName: categorykName,
        createdBy: createdBy,
      },{
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      }).then((response) => {
          setExpenditureCategory([response.data,...expenditureCategory]);
          setCategorykName('');
          navigate('/expenditure_category');
      })
      .catch((err) => {
          setError(err.message);
      });
      

  }

  return (
    <>
    <div className="add-container">
        <div className="card-input">
            <div className="top-side">
                <a href="#" id="cancellogin"><i className="fa-sharp fa-solid fa-circle-xmark"></i></a>
            </div>
            <div className="middle-side">
                <p>ONGEZA AINA YA MATUMIZI</p>
            </div>
            <div className="botton-side">
                <form onSubmit={handleSubmit} class="input-form">
                    <div className="in-input">
                        <p className="message-box"><a className="message" href="#">{error}</a></p>
                    </div>
                    <div className="in-input">
                        <i className="fa-solid fa-envelope"></i>
                        <input type="text" value={categorykName} placeholder="AINA YA MATUMIZI" onChange={(e) => setCategorykName(e.target.value)}/>
                    </div>
                    <div className="in-input-text">
                        <button type="submit">ONGEZA</button>
                    </div>
                    <div className="in-input-text">
                        <Link to="/expenditure_category" className='cancelBtn'><button type="reset">GHAIRI</button></Link>
                    </div>
                    
                </form>
            </div>

        </div>
    </div>
    </>
  )
}
