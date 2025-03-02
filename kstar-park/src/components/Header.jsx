import React from 'react'
import './Header.css';
import { useKeycloak } from '@react-keycloak/web'


export const Header = () => {
  const { keycloak, initialized } = useKeycloak();
  return (
    <>
    <header>
        <div className="logo">
            <img src="src/assets/images/logo.png" alt="" className='logo-image'/>
        </div>
        <div className='title-top'>
          <p>K-STAR PARK DAILY STOCKSHEET REPORT SYSTEM</p>
        </div>
        <div className="profile-account">
          {
            keycloak.authenticated ? <p>({keycloak.tokenParsed.preferred_username})</p> : null
          } 
        </div>
    </header>
    </>
  );
}
