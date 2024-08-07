import React from 'react'
import './VisitorPage.css'
import logo from '../../img/navbarlogo.png'
import denemepng from '../../img/iceland-5120x2880-5k-4k-wallpaper-osx-forest-apple-waterfall-173.jpg'
import team from '../../img/team.png'
import { useNavigate } from 'react-router-dom';
function VisitorPage() {
    const navigate = useNavigate();

    const goRegister = () => {
        navigate('/register');
    }

    const goLogin = () => {
        navigate('/login');
    }
    const goUserStories = () => {
        navigate('/userstories');
    }
    const goResources = () => {
        navigate('/resources');
    }



  return (
    <>
    <div className="row">
        <nav className="navbar navbar-expand-lg  fixed-top" style={{backgroundColor: 'white'}}>
            <div className="container-fluid">
              <a className="navbar-brand"><img src={logo}  width='160px' height='72px' /></a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
                  
                  <li className="nav-item">
                    <a className="nav-link active" onClick={goUserStories} aria-current="page" style={{color: 'rgb(17, 63, 79)', cursor: 'pointer'}}>Kullancı Hikayeleri</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" onClick={goResources} aria-current="page" style={{color: 'rgb(17, 63, 79)', cursor: 'pointer'}}>Kaynaklar</a>
                  </li>
                  
                  
                </ul>
                <button onClick={goRegister} className="btn btn-outline-info mb-2 me-2" style={{color: 'rgb(17, 63, 79)', borderColor: 'rgb(17, 63, 79)'}} type="submit">Teklif Alın</button>
                <button onClick={goLogin} className="btn btn-outline-success mb-2 me-2" type="submit">Giriş Yap</button>  
              </div>
            </div>
        </nav>
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
                  <img src={team} className="d-block w-100" alt="..." />
                  <div className="carousel-caption d-none d-md-block" style={{backgroundColor:'black' }}>
                    <h5>Sektörde Tecrübeli Yazılımcılar</h5>
                    <p>Alanında Tecrübeli teknik ekibimizle tüm ihtiyaçlarınıza uygun hızlı çözümler sunmaktayız.</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src={denemepng} className="d-block w-100" alt="..."  />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>Görselliğe ve Kullanılabilirliğe önem veriyoruz</h5>
                    <p>Tasarımlarımız tecrübeli UX ve UI ekiplerimiz tarafından sizler için en uygun şekilde yapılmaktadır.</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src={denemepng} className="d-block w-100" alt="..." />
                  <div className="carousel-caption d-none d-md-block">
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