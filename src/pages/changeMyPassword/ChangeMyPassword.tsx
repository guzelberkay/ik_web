import React, { useState } from 'react'
import logo from '../../img/navbarlogo.png';
import eyeIcon from '../../img/eye-icon.png';
import eyeOffIcon from '../../img/eye-off-icon.png';
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { fetchResetPassword } from '../../store/future/userSlice';
import { useNavigate } from 'react-router-dom';


function ChangeMyPassword() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [code, setCode] = useState('');
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    

    const changePassword = () => {
      if (password !== confirmPassword) {
        swal("Hata", "Yeni parolalar uyusmuyor!", "error");
        return;
      }else {
        dispatch(fetchResetPassword({code: code, password: password})).then(() => {
          swal("Parola değiştirildi", "Parola değiştirildi", "success").then(() => {
            navigate('/login');
          });
        });
      }
    }



  return (
    <section className="login-wrapper" style={{minWidth: '200vh'}} >
    <div className="login-container" >
      <img src={logo} alt="Logo" className="logo" style={{width: '300px'}} />
      <form action="#">
        <label>Doğrulama Kodu</label>
        <input 
          type="text" 
          onChange={evt => setCode(evt.target.value)}
          placeholder="Doğrulama Kodu" 
          required 
        />
        <label>Yeni Parolanızı Girin</label>
        <div className="password-container">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Parola" 
            onChange={evt => setPassword(evt.target.value)}
            required 
            className="password-input"
          />
          <span className="password-toggle"  onClick={() => setShowPassword(!showPassword)}>
            <img src={showPassword ? eyeOffIcon : eyeIcon} alt="Toggle Password Visibility" className="eye-icon" />
          </span>
        </div>


        <label>Yeni Parolanızı Tekar Girin</label>
        <div className="password-container">
          <input 
            type={showConfirmPassword ? "text" : "password"} 
            placeholder="Parola"
            onChange={evt => setConfirmPassword(evt.target.value)} 
            required 
            className="password-input"
          />
          <span className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            <img src={showConfirmPassword ? eyeOffIcon : eyeIcon} alt="Toggle Password Visibility" className="eye-icon" />
          </span>
        </div>

        <button type="button" onClick={changePassword} >Parolayı değiştir</button>
        
      </form>
    </div>
  </section>
  )
}

export default ChangeMyPassword