import React from 'react'
import './Navigation.css'
import { NavLink } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'

export const Navigation = () => {
  const { keycloak, initialized } = useKeycloak();

  console.log(keycloak.resourceAccess)

  return (
    <div className="nav-bar">
        <nav className="nav">
          
            <ul>
                <li><NavLink to="/" style={({isActive}) => isActive ? {color: 'red',fontWeight: 'bold'} : undefined}>MWANZO</NavLink></li>
                <li><NavLink to="/drinks" style={({isActive}) => isActive ? {color: 'red',fontWeight: 'bold'} : undefined}>VINYWAJI</NavLink></li>
                {
                  (keycloak.hasResourceRole('manager') ||  keycloak.hasResourceRole('admin') || keycloak.hasResourceRole('counter')) && (
                    <li><NavLink to="/import" style={({isActive}) => isActive ? {color: 'red',fontWeight: 'bold'} : undefined} >VILIVYOINGIA</NavLink></li>
                  )
                }
                {
                  (keycloak.hasResourceRole('counter') ||  keycloak.hasResourceRole('admin')) && (
                    <li><NavLink to="/remain-drinks" style={({isActive}) => isActive ? {color: 'red',fontWeight: 'bold'} : undefined} >BAKI</NavLink></li>
                  )
                }
                <li><NavLink to="/sold" style={({isActive}) => isActive ? {color: 'red',fontWeight: 'bold'} : undefined}>VILIVYOUZWA</NavLink></li>
                <li><NavLink to="/expenditure" style={({isActive}) => isActive ? {color: 'red',fontWeight: 'bold'} : undefined}>MATUMIZI</NavLink></li>
                {
                  (keycloak.hasResourceRole('manager') ||  keycloak.hasResourceRole('admin')) && (
                    <li><NavLink to="/expenditure_category" style={({isActive}) => isActive ? {color: 'red',fontWeight: 'bold'} : undefined}>AINA YA MATUMIZI</NavLink></li>
                  )
                }

                {
                  (keycloak.hasResourceRole('manager') ||  keycloak.hasResourceRole('admin') || keycloak.hasResourceRole('counter')) && (
                    <li><NavLink to="/float" style={({isActive}) => isActive ? {color: 'red',fontWeight: 'bold'} : undefined}>FLOAT</NavLink></li>
                  )
                }

                {
                  (keycloak.hasResourceRole('manager') ||  keycloak.hasResourceRole('admin') || keycloak.hasResourceRole('counter')) && (
                    <li><NavLink to="/debt" style={({isActive}) => isActive ? {color: 'red',fontWeight: 'bold'} : undefined}>MADENI</NavLink></li>
                  )
                }

                {
                  (keycloak.hasResourceRole('manager') ||  keycloak.hasResourceRole('admin') || keycloak.hasResourceRole('counter')) && (
                    <li><NavLink to="/summary" style={({isActive}) => isActive ? {color: 'red',fontWeight: 'bold'} : undefined}>TAARIFA</NavLink></li>
                  )
                }

                {
                  (keycloak.hasResourceRole('manager') ||  keycloak.hasResourceRole('admin')) && (
                    <li><NavLink to="/profit" style={({isActive}) => isActive ? {color: 'red',fontWeight: 'bold'} : undefined}>FAIDA</NavLink></li>
                  )
                }


                <li ><NavLink style={({isActive}) => isActive ? {color: 'red',fontWeight: 'bold'} : undefined}>
                {!keycloak.authenticated && (
                   <button
                     type="button"
                     className="text-blue-800"
                     onClick={() => keycloak.login()}
                   >
                     INGIA
                   </button>
                 )}

                {!!keycloak.authenticated && (
                   <button
                     type="button"
                     className="text-blue-800"
                     onClick={() => keycloak.logout()}
                   >
                     TOKA NJE
                   </button>
                 )}
                 </NavLink>
                 </li>
            </ul>
    
        </nav>
    </div>
  )
}
