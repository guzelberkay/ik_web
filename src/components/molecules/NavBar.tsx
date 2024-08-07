import React from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../../img/navbarlogo.png';

function NavBar() {
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
    const goMainPage = () => {
        navigate('/');
    }
  return (
    <nav className="navbar navbar-expand-lg  fixed-top" style={{backgroundColor: 'white'}}>
            <div className="container-fluid">
              <a className="navbar-brand"><img src={logo}  width='160px' height='72px' /></a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" onClick={goMainPage} aria-current="page" style={{color: 'rgb(17, 63, 79)', cursor: 'pointer'}}>Ana Sayfa</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" onClick={goUserStories} aria-current="page" style={{color: 'rgb(17, 63, 79)', cursor: 'pointer'}}>Kullancı Hikayeleri</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" onClick={goResources} aria-current="page" style={{color: 'rgb(17, 63, 79)', cursor: 'pointer'}}>Kaynaklar</a>
                  </li>
                  
                  
                </ul>
                <button onClick={goRegister} className="btn btn-outline-info mb-2 me-2" style={{color: 'rgb(17, 63, 79)', borderColor: 'rgb(17, 63, 79)'}} type="submit">Kayıt Olun</button>
                <button onClick={goLogin} className="btn btn-outline-success mb-2 me-2" type="submit">Giriş Yap</button>  
              </div>
            </div>
        </nav>
  )
}

export default NavBar