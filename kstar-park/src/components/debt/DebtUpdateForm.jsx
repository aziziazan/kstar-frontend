import { useState,useEffect } from 'react'
import React from 'react'
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';

export const DebtUpdateForm = ({debtId}) => {
  const navigate = useNavigate();
  const { keycloak, initialized } = useKeycloak();
  const [debtAmount,setDebtAmount] = useState('');
  const [description,setDescription] = useState('');
  const [createdBy,setCreatedBy] = useState('');

  const [debts, setDebts] = useState('');
  const [error,setError] = useState('');
 

  useEffect(() => {
     axios.get(`http://localhost:8084/api/debt/find-debt/${debtId}`,{
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      }).then((response) => {
        setDebtAmount(response.data.debtAmount);
        setDescription(response.data.description);
        setCreatedBy(response.data.createdBy);
     }).catch((error) => {
      setError(error.message);
     });
  }, [debtId]);

  const handleSubmit = (e) =>{
    e.preventDefault();
    setCreatedBy(keycloak.tokenParsed.preferred_username);
    updateDebt(debtId,debtAmount,description,createdBy);
  }

  const updateDebt = (debtId,debtAmount,description,createdBy) =>{
    axios.put(`http://localhost:8084/api/debt/update-debt/`,{
        id: debtId, 
        debtAmount: debtAmount,
        description: description,
        createdBy: createdBy,
    },{
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      }).then((response) => {
        setDebts([response.data,...debts]);
        navigate('/debt');
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
                    <p>HUISHA MADENI</p>
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
                            <button type="submit">HUISHA</button>
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
