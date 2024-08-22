import React from 'react';
import logo from '../../img/navbarlogo.png';

interface SideBarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

function SideBarForEmployee({ activeItem, setActiveItem }: SideBarProps) {

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
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
            className={`nav-link link-dark ${activeItem === 'expenseSave' ? 'active' : ''}`}
            onClick={() => handleItemClick('expenseSave')}
          >
            <svg className="bi me-2" width="16" height="16"><use href="#grid"></use></svg>
            Harcama kaydet
          </a>
        </li>
        <li>
          <a 
            href="#" 
            className={`nav-link link-dark ${activeItem === 'myexpenses' ? 'active' : ''}`}
            onClick={() => handleItemClick('myexpenses')}
          >
            <svg className="bi me-2" width="16" height="16"><use href="#grid"></use></svg>
            Harcamalarım
          </a>
        </li>
        <li>
          <a 
            href="#" 
            className={`nav-link link-dark ${activeItem === 'myshifts' ? 'active' : ''}`}
            onClick={() => handleItemClick('myshifts')}
          >
            <svg className="bi me-2" width="16" height="16"><use href="#grid"></use></svg>
            Vardiyalarım
          </a>
        </li>
        <li>
          <a 
            href="#" 
            className={`nav-link link-dark ${activeItem === 'leaveRequest' ? 'active' : ''}`}
            onClick={() => handleItemClick('leaveRequest')}
          >
            <svg className="bi me-2" width="16" height="16"><use href="#grid"></use></svg>
            İzin Talep Et
          </a>
        </li>
        <li>
          <a 
            href="#" 
            className={`nav-link link-dark ${activeItem === 'manageAssets' ? 'active' : ''}`}
            onClick={() => handleItemClick('manageAssets')}
          >
            <svg className="bi me-2" width="16" height="16"><use href="#grid"></use></svg>
            Zimmetleri Yönet
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

export default SideBarForEmployee;
