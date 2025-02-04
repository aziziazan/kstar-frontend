import React, { useEffect, useState } from 'react';
import './ImportDrinkTable.css';
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';

export const ImportDrinkTable = () => {
    const [importDrinks,setImportDrinks] = useState([]);
    const navigate = useNavigate();
    let content = <p>Inatafuta........</p>;




    useEffect(() => {
        axios.get(`http://localhost:8086/api/import-drink/list-import-drink/`).then((response) => {
           setImportDrinks(response.data);
           
        });
    },[]);

    const updateImportDrink = (importDrinkId) => {
      navigate(`/import/update-import-drink/${importDrinkId}`);
    }
    
    const deleteImportDrink = (importDrinkId) => {
      navigate(`/import/delete-import-drink/${importDrinkId}`);
    }

    if(importDrinks != ""){
      content = (
        <table className='table'>
            <thead>
              <tr>
                <th>JINA LA KINYWAJI</th>
                <th>TAREHE YA KUINGIZA</th>
                <th>IDADI</th>
                <th>JUMLA YA GHARAMA</th>
                <th>GHARAMA YA KILA KINYWAJI</th>
                <th colSpan="2">MATENDO</th>
              </tr>
            </thead>
            <tbody>
      
              {importDrinks.map((importDrink) => {
                return(
                  <tr key={importDrink.id}>
                  <td>{importDrink.drinkName}</td>
                  <td>{importDrink.date}</td>
                  <td>{importDrink.noOfDrinksAdded}</td>
                  <td>{importDrink.totalCost}</td>
                  <td>{importDrink.costOfEachDrink}</td>
                  <td><button onClick={() => deleteImportDrink(importDrink.id)}>FUTA</button></td>
                  <td><button onClick={() => updateImportDrink(importDrink.id)}>HUISHA</button></td>
                  </tr>
                );
              })}

            </tbody>
          </table>
      )
    }else{
      content = <div className='NoDrinkBox'><h4>Hakuna Kinywaji chochote, bonyeza <Link to="/import/add-drink">HAPA</Link> kuongeza</h4></div>;
    }


  return (
    <>
    <div className='container'>
    <div className="table-header">
        <div className='other'>

        </div>
        <div className='title'>
            <h3>ORODHA YA VINYWAJI VILIVYOINGIZWA</h3>
        </div>
        <div className='action'>
            <Link to="/import/add-drink">ONGEZA KINYWAJI</Link>
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
