import React, { useState } from 'react';
import './Login.css';
import { useDispatch } from 'react-redux';
import { fetchLogin } from '../../store/future/authSlice';
import { AppDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';
import logo from "../../img/logo.png";
import eyeIcon from "../../img/eye-icon.png";
import eyeOffIcon from "../../img/eye-off-icon.png";

function Login() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const login = () => {
    dispatch(fetchLogin({ email, password })).then(data => {
      if (data.payload.code === 200) {
        navigate('/');
      }
    });
  };

  return (
    <section className="login-wrapper">
      <div className="login-container">
        <img src={logo} alt="Logo" className="logo" />
        <form action="#">
          <label>E-posta Adresi</label>
          <input 
            type="text" 
            onChange={evt => setEmail(evt.target.value)} 
            placeholder="E-posta Adresi" 
            required 
          />
          <label>Parola</label>
          <div className="password-container">
            <input 
              type={showPassword ? "text" : "password"} 
              onChange={evt => setPassword(evt.target.value)} 
              placeholder="Parola" 
              required 
              className="password-input"
            />
            <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              <img src={showPassword ? eyeOffIcon : eyeIcon} alt="Toggle Password Visibility" className="eye-icon" />
            </span>
          </div>
          <button type="button" onClick={login}>Giriş Yap</button>
          <div className="links">
            <a href="#" className='forgotPassword'>Parolamı Unuttum</a>
            <a href="#">Kurumsal Giriş</a>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
