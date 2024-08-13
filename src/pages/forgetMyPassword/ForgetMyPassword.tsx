import React, { useState } from 'react'
import logo from '../../img/navbarlogo.png';
import eyeIcon from '../../img/eye-icon.png';
import eyeOffIcon from '../../img/eye-off-icon.png';
import swal from 'sweetalert';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { fetchForgotPassword } from '../../store/future/userSlice';
import { useNavigate } from 'react-router-dom';

function ForgetMyPassword() {
    const [eMail, setEmail] = useState<string>('');
    const dispatch : AppDispatch = useDispatch();
    const navigate = useNavigate();
    
    const sendEmail = () => {
        console.log('Email:', eMail);
        dispatch(fetchForgotPassword({email:eMail})).then(() => {
            swal("Mail Gönderildi", "Mail adresinize sıfırlama linki gönderildi", "success");
        }).then(() => {
            navigate("/")
        });
    }
  return (
    <section className="login-wrapper" style={{minWidth: '200vh'}} >
    <div className="login-container" >
      <img src={logo} alt="Logo" className="logo" style={{width: '300px'}} />
      <form action="#">
        <label>Hesabınıza Ait Mail Adresinizi Girin</label>
        <input 
          type="text" 
          onChange={evt => setEmail(evt.target.value)}
          placeholder="Mail adresi" 
          required 
        />
       


        
        <button type="button" onClick={sendEmail}>Gönder</button>
        
      </form>
    </div>
  </section>
  )
}

export default ForgetMyPassword