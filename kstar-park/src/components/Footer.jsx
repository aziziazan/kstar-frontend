import React from 'react'
import './Footer.css'

export const Footer = () => {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <>
    <footer>
        <div className="top">


        </div>
        <div className="bottom">
            <div className="bottom-top">
                <div className="bottom-top-left">
                    <p><span><i className="fa-solid fa-envelope"></i></span>Copyright@{year}, K-STAR PARK</p>
                </div>
            </div>
        </div>

    </footer>
    </>
  )
}
