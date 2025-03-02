import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

export const ExpenditureAddForm = () => {
  const { keycloak, initialized } = useKeycloak();
  const [amount,setAmount] = useState('');
  const [categoryExpenditureId,setCategoryExpenditureId] = useState('');
  const [date,setDate] = useState('');
  const [createdBy,setCreatedBy] = useState(keycloak.tokenParsed.preferred_username);

  const [expenditures,setExpenditures] = useState([]);
  const [expenditureCategories, setExpenditureCategories] = useState([]);

  const [error,setError] = useState('');
  const navigate = useNavigate();
  const [searchExpenditureCategoryName,setSearchExpenditureCategoryName] = useState('');
  

  
  
  
  const handleSubmit = (e) =>{
      e.preventDefault();
      addExpenditure(amount,categoryExpenditureId,createdBy);
      console.log(date);
  
  }

  useEffect(() => {
      if(searchExpenditureCategoryName == ''){
        axios.get(`http://localhost:8084/api/category/list/`,{
            headers: {
              Authorization: `Bearer ${keycloak.token}`
            }
          }).then((response) => {
          setExpenditureCategories(response.data);
        });
      }else{
        axios.get(`http://localhost:8084/api/category/list/${searchExpenditureCategoryName}`,{
            headers: {
              Authorization: `Bearer ${keycloak.token}`
            }
          }).then((response) => {
          setExpenditureCategories(response.data);
        });
      }
  
  },[searchExpenditureCategoryName]);

  const addExpenditure = (amount,categoryExpenditureId,createdBy) =>{
      axios.post('http://localhost:8084/api/expenditure/create-expenditure/',{
          amount: amount,
          categoryExpenditureId: categoryExpenditureId,
          createdBy: createdBy,
      },{
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      }).then((response) => {
          setExpenditures([response.data,...expenditures]);
          setAmount('');
          setCategoryExpenditureId('');
          navigate('/expenditure');
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
                <p>INGIZA MATUMIZI</p>
            </div>
            <div className="botton-side">
                <form onSubmit={handleSubmit} class="input-form">
                    <div className="in-input">
                        <p className="message-box"><a className="message" href="#">{error}</a></p>
                    </div>
                    <div className="in-input">
                        <i className="fa-solid fa-envelope"></i>
                        <input type="search"  placeholder="Tafuta kinywaji..." onChange={(e) => setSearchExpenditureCategoryName(e.target.value)}/>
                        <select name="" id="" onChange={(e) => setCategoryExpenditureId(e.target.value) } required>
                            <option value="">Chagua matumizi..</option>
                            {
                                expenditureCategories.map((expenditureCategory) => {
                                    return <option key={expenditureCategory.id} value={expenditureCategory.id}>{expenditureCategory.expenditureName}</option>
                                })
                            }
                            
                        </select>
                    </div>
                    <div className="in-input">
                        <i className="fa-solid fa-envelope"></i>
                        <input type="number"  placeholder="KIASI" onChange={(e) => setAmount(e.target.value)} required/>
                    </div>
                    <div className="in-input-text">
                        <button type="submit">INGEZA</button>
                    </div>
                    <div className="in-input-text">
                        <Link to="/expenditure" className='cancelBtn'><button type="reset">GHAIRI</button></Link>
                    </div>
                    
                </form>
            </div>

        </div>
    </div>
    </>
  )
}
