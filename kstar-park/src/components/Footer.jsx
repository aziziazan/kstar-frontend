import React from 'react'
import './Footer.css'

export const Footer = () => {
  return (
    <>
    <footer>
        <div className="top">
            <div className="top-left">
                <div>
                  <p>rucu.sims.com</p>
                  <p>iringa.iruwasa.com</p>
                  <p>rucu.sims.com</p>
                  <p>iringa.iruwasa.com</p>
                </div>
            </div>
            <div className="top-right">
                <div>
                    <p>www.design.com</p>
                    <p>rucu.sims.com</p>
                    <p>iringa.iruwasa.com</p>
                </div>
            </div>

        </div>
        <div className="bottom">
            <div className="bottom-top">
                <div className="bottom-top-left">
                    <p><span><i className="fa-solid fa-envelope"></i></span>aziziazan.net@gmail.com</p>
                </div>
                <div className="bottom-top-middle">
                    <p><span><i className="fa-solid fa-phone"></i></span>0620682719</p>
                </div>
                <div className="bottom-top-right">
                    <p><span><i className="fa-brands fa-facebook"></i></span>aziziazan</p>
                </div>

            </div>
            <div className="bottom-bottom">
                <p>Copyright@2023</p>
            </div>
        </div>

    </footer>
    </>
  )
}
