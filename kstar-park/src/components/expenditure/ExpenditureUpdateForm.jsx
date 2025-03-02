import { useKeycloak } from '@react-keycloak/web';
import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

export const ExpenditureUpdateForm = ({expenditureId}) => {
  const { keycloak, initialized } = useKeycloak();
  const [amount,setAmount] = useState('');
  const [categoryExpenditureId,setCategoryExpenditureId] = useState('');
  const [createdBy,setCreatedBy] = useState(keycloak.tokenParsed.preferred_username);

  const [expenditures,setExpenditures] = useState([]);
  const [expenditureCategories, setExpenditureCategories] = useState([]);

  const [error,setError] = useState('');
  const navigate = useNavigate();
  const [searchExpenditureCategoryName,setSearchExpenditureCategoryName] = useState('');
  

  useEffect(() => {

    axios.get(`http://localhost:8084/api/expenditure/find/${expenditureId}`,{
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      }).then((response) => {

       setAmount(response.data.amount);
       setCategoryExpenditureId(response.data.categoryExpenditureId);

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

      }).catch((error) => {
        setError(error.message);
    });

  },[expenditureId,searchExpenditureCategoryName]);

  const handleSubmit = (e) =>{
    e.preventDefault();
    updateExpenditure(expenditureId,amount,categoryExpenditureId,createdBy);
  }


  const updateExpenditure = (expenditureId,amount,categoryExpenditureId) => {
    axios.put('http://localhost:8084/api/expenditure/update/',{
      id: expenditureId,
      amount: amount,
      categoryExpenditureId: categoryExpenditureId,
      createdBy: createdBy,
  },{
    headers: {
      Authorization: `Bearer ${keycloak.token}`
    }
  }).then((response) => {
      setExpenditures([response.data,...expenditures]);
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
                <p>HUISHA MATUMIZI</p>
            </div>
            <div className="botton-side">
                <form onSubmit={handleSubmit} class="input-form">
                    <div className="in-input">
                        <p className="message-box"><a className="message" href="#">{error}</a></p>
                    </div>
                    <div className="in-input">
                        <i className="fa-solid fa-envelope"></i>
                        <input type="search"  placeholder="Tafuta kinywaji..." onChange={(e) => setSearchExpenditureCategoryName(e.target.value)}/>
                        <select name="" id="" value={categoryExpenditureId} onChange={(e) => setCategoryExpenditureId(e.target.value) } required>
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
                        <input type="number"  placeholder="KIASI" value={amount} onChange={(e) => setAmount(e.target.value)} required/>
                    </div>
                    <div className="in-input-text">
                        <button type="submit">HUISHA</button>
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
