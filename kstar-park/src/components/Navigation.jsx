import React from 'react'
import './Navigation.css'
import { NavLink } from 'react-router-dom'


export const Navigation = () => {
  return (
    <div className="nav-bar">
        <nav className="nav">
            <ul>
                <li id="eachList"><NavLink to="/" style={({isActive}) => isActive ? {color: 'red',fontWeight: 'bold'} : undefined}>MWANZO</NavLink></li>
                <li id="eachList"><NavLink to="/drinks" style={({isActive}) => isActive ? {color: 'red',fontWeight: 'bold'} : undefined}>VINYWAJI</NavLink></li>
                <li id="eachList"><NavLink to="/import" style={({isActive}) => isActive ? {color: 'red',fontWeight: 'bold'} : undefined} >MAINGIZO</NavLink></li>
                <li id="eachList"><NavLink to="/sold" style={({isActive}) => isActive ? {color: 'red',fontWeight: 'bold'} : undefined}>MAUZO</NavLink></li>
                <li id="eachList"><NavLink to="/expenditure" style={({isActive}) => isActive ? {color: 'red',fontWeight: 'bold'} : undefined}>MATUMIZI</NavLink></li>
                <li id="eachList"><NavLink to="/payment" style={({isActive}) => isActive ? {color: 'red',fontWeight: 'bold'} : undefined}>MALIPO</NavLink></li>
                <li id="eachList"><NavLink to="/sign-in" style={({isActive}) => isActive ? {color: 'red',fontWeight: 'bold'} : undefined}>INGIA</NavLink></li>
                <li id="eachList"><NavLink to="/sign-up" style={({isActive}) => isActive ? {color: 'red',fontWeight: 'bold'} : undefined}>TOKA NJE</NavLink></li>
            </ul>
    
        </nav>
    </div>
  )
}
