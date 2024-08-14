import React, { useState } from 'react';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { decodeToken, fetchLogin } from '../../store/future/authSlice';
import { AppDispatch, useAppSelector } from '../../store';
import { useNavigate } from 'react-router-dom';
import logo from "../../img/logo.png";
import eyeIcon from "../../img/eye-icon.png";
import eyeOffIcon from "../../img/eye-off-icon.png";
import swal from 'sweetalert';

function Login() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // userId'yi saklamak için bir state
  const [userId, setUserId] = useState<number | null>(null);

  const login = () => {
    dispatch(fetchLogin({ email, password })).then((data: any) => {
      if (data.payload && data.payload.code === 200) {
        const token = data.payload.data;
        const decodedToken = decodeToken(token);
        const role = decodedToken.role;
        const userId = decodedToken.userId;

        // userId'yi state'e kaydedin
        setUserId(userId);

        // userId'yi localStorage'a kaydeder
        localStorage.setItem('userId', userId.toString());

        if (role === 'ADMIN') {
          navigate('/adminpanel');
        } else {
          navigate('/dashboard');
        }
      } else {
        swal("Hata", data.error.message || "Giriş işlemi başarısız oldu!", "error");
      }
    });
  };
  
  const goForgotPassword = () => {
    navigate('/forgetmypassword');
  }

  return (
    <section className="login-wrapper" style={{minWidth: '200vh'}} >
      <div className="login-container" >
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
            <a className="forgotPassword" onClick={goForgotPassword}>Parolamı Unuttum</a>
            <a href="register">Kayıt Ol</a>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
