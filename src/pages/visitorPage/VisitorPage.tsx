import React from 'react'
import './VisitorPage.css'
import logo from '../../img/navbarlogo.png'
import denemepng from '../../img/iceland-5120x2880-5k-4k-wallpaper-osx-forest-apple-waterfall-173.jpg'
import team from '../../img/team.png'
import ux from '../../img/UX-vs-UI-Design.png'
import happyCustomer from '../../img/happy-customers-1080x675.jpg'
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/molecules/NavBar'
function VisitorPage() {
    



  return (
    <>
    <div className="row">
        <NavBar/>
    </div>

    <div className="row">
        <div id="carouselExampleCaptions" className="carousel slide">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div className="carousel-inner" style={{height: '600px', width: '1000px'}}>
                <div className="carousel-item active">
                  <img src={team} className="d-block w-100" alt="..."  style={{height: '600px', width: '1000px'}}/>
                  <div className="carousel-caption d-none d-md-block" style={{backgroundColor:'black' }}>
                    <h5>Sektörde Tecrübeli Yazılımcılar</h5>
                    <p>Alanında Tecrübeli teknik ekibimizle tüm ihtiyaçlarınıza uygun hızlı çözümler sunmaktayız.</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src={ux} className="d-block w-100" alt="..."  style={{height: '600px', width: '1000px'}} />
                  <div className="carousel-caption d-none d-md-block" style={{backgroundColor:'black' }}>
                    <h5>Görselliğe ve Kullanılabilirliğe önem veriyoruz</h5>
                    <p>Tasarımlarımız tecrübeli UX ve UI ekiplerimiz tarafından sizler için en uygun şekilde yapılmaktadır.</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src={happyCustomer} className="d-block w-100" alt="..." style={{height: '600px', width: '1000px'}}/>
                  <div className="carousel-caption d-none d-md-block" style={{backgroundColor:'black' }}>
                    <h5>Piyasada en ucuz biziz!</h5>
                    <p>Daha ucuzu varsa aynı fiyattan teklif yaparız!!</p>
                  </div>
                </div>
              </div>
              <div className='justify-content-center'>
                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
              </div>
        </div>
    </div>

    
    
    </>
    
  )
}

export default VisitorPage