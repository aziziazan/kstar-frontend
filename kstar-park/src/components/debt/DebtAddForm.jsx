import React, { useState } from 'react'
import axios from "axios";
import { Link, replace, useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

export const DebtAddForm = () => {
  const { keycloak, initialized } = useKeycloak();
  const [debtAmount,setDebtAmount] = useState('');
  const [description,setDescription] = useState('');
  const [createdBy,setCreatedBy] = useState(keycloak.tokenParsed.preferred_username);

  const [debts,setDebts] = useState([]);
  const [error,setError] = useState('');
  const navigate = useNavigate();



  const handleSubmit = (e) =>{
      e.preventDefault();
      addDebt(debtAmount,description,createdBy);
  }


  const addDebt = (debtAmount,description,createdBy) =>{
      axios.post('http://localhost:8084/api/debt/add-debt/',{
          debtAmount: debtAmount,
          description: description,
          createdBy: createdBy
      },{
          headers: {
            Authorization: `Bearer ${keycloak.token}`
          }
        }
      ).then((response) => {
          setDebts([response.data,...debts]);
          setDebtAmount('');
          setDescription('');
          navigate('/debt', { replace: true });
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
                <p>INGIZA MADENI</p>
            </div>
            <div className="botton-side">
                <form onSubmit={handleSubmit} class="input-form">
                    <div className="in-input">
                        <p className="message-box"><a className="message" href="#">{error}</a></p>
                    </div>
                    <div className="in-input">
                        <i className="fa-solid fa-lock"></i>
                        <input type="number" value={debtAmount} placeholder="KIASI" onChange={(e) => setDebtAmount(e.target.value)}/>
                    </div>
                    <div className="in-input">
                        <i className="fa-solid fa-envelope"></i>
                        <input type="text-area" value={description} placeholder="MAELEZO" onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className="in-input-text">
                        <button type="submit">INGIZA</button>
                    </div>
                    <div className="in-input-text">
                        <Link to="/debt" className='cancelBtn'><button type="reset">GHAIRI</button></Link>
                    </div>
                    
                </form>
            </div>

        </div>
    </div>
    </>
  )
}
