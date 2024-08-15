import React from 'react';
import logo from '../../img/navbarlogo.png';

interface SideBarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

function SideBar({ activeItem, setActiveItem }: SideBarProps) {

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div 
      className="d-flex flex-column p-3 bg-white"
      style={{
        width: '280px',
        position: 'fixed',
        top: '0',
        left: '0',
        height: '100vh',
        zIndex: '1000',
      }}
    >
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <svg className="bi me-2" width="40" height="32"><use href="#bootstrap"></use></svg>
        <span className="fs-4"><img src={logo}  width='160px' height='72px' /></span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a 
            href="#" 
            className={`nav-link link-dark ${activeItem === 'home' ? 'active' : ''}`} 
            aria-current="page"
            onClick={() => handleItemClick('home')}
          >
            <svg className="bi me-2" width="16" height="16"><use href="#home"></use></svg>
            AnaSayfa
          </a>
        </li>
        <li>
          <a 
            href="#" 
            className={`nav-link link-dark ${activeItem === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleItemClick('dashboard')}
          >
            <svg className="bi me-2" width="16" height="16"><use href="#speedometer2"></use></svg>
            Dashboard
          </a>
        </li>
        <li>
          <a 
            href="#" 
            className={`nav-link link-dark ${activeItem === 'userupdate' ? 'active' : ''}`}
            onClick={() => handleItemClick('userupdate')}
          >
            <svg className="bi me-2" width="16" height="16"><use href="#"></use></svg>
            Kullanıcı Güncelle
          </a>
        </li>
        <li>
          <a 
            href="#" 
            className={`nav-link link-dark ${activeItem === 'products' ? 'active' : ''}`}
            onClick={() => handleItemClick('products')}
          >
            <svg className="bi me-2" width="16" height="16"><use href="#grid"></use></svg>
            Products
          </a>
        </li>
        <li>
          <a 
            href="#" 
            className={`nav-link link-dark ${activeItem === 'leavesave' ? 'active' : ''}`}
            onClick={() => handleItemClick('leavesave')}
          >
            <svg className="bi me-2" width="16" height="16"><use href="#grid"></use></svg>
            Çalışanlara İzin Tanımla
          </a>
        </li>
        <li>
          <a 
            href="#" 
            className={`nav-link link-dark ${activeItem === 'leavemanage' ? 'active' : ''}`}
            onClick={() => handleItemClick('leavemanage')}
          >
            <svg className="bi me-2" width="16" height="16"><use href="#grid"></use></svg>
            İzin Talepleri
          </a>
        </li>
        <li>
          <a 
            href="#" 
            className={`nav-link link-dark ${activeItem === 'employeesave' ? 'active' : ''}`}
            onClick={() => handleItemClick('employeesave')}
          >
            <svg className="bi me-2" width="16" height="16"><use href="#grid"></use></svg>
            Çalışan Ekle
          </a>
        </li>
        <li>
          <a 
            href="#" 
            className={`nav-link link-dark`}
            onClick={() => logout()}
          >
            <svg className="bi me-2" width="16" height="16"><use href="#grid"></use></svg>
            Çıkış Yap
          </a>
        </li>
      </ul>
      <hr />
    </div>
  )
}

export default SideBar;
