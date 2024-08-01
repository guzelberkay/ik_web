import React, { useState } from 'react';
import './Register.css';
import { useDispatch } from 'react-redux';
import { fetchRegister } from '../../store/future/authSlice';
import { AppDispatch } from '../../store';
import swal from 'sweetalert';

function Register() {
  const dispatch: AppDispatch = useDispatch();
  const [isActive, setIsActive] = useState(true);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [numberOfEmployee, setNumberOfEmployee] = useState('');
  const [purposeOfRequest, setPurposeOfRequest] = useState('');

  const register = () => {
    if (password !== rePassword) {
      swal("Hata", "Parolalar eşleşmiyor!", "error");
      return;
    }

    dispatch(fetchRegister({
      name, password, rePassword, email, phone, company, title, numberOfEmployee, purposeOfRequest
    })).then(data => {
      if (data.payload.code === 200) {
        swal("Başarılı!", "Kullanıcı kayıt edilmiştir!", "success")
          .then(() => setIsActive(true));
      }
    });
  };

  return (
    <section className={isActive ? "wrapper active" : "wrapper"}>
      <div className="form signup">
        <header onClick={() => setIsActive(false)}>Register</header>
        <form action="#">
          <div className="input-group">
            <input 
              type="text" 
              onChange={evt => setName(evt.target.value)} 
              placeholder="Ad Soyad" 
              required 
            />
            <input 
              type="text" 
              onChange={evt => setEmail(evt.target.value)} 
              placeholder="E-posta" 
              required 
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              onChange={evt => setPassword(evt.target.value)} 
              placeholder="Parola" 
              required 
            />
            <input 
              type="password" 
              onChange={evt => setRePassword(evt.target.value)} 
              placeholder="Parola (Tekrar)" 
              required 
            />
          </div>
          <div className="input-group">
            <input 
              type="text" 
              onChange={evt => setPhone(evt.target.value)} 
              placeholder="0501 234 56 78" 
              required 
            />
            <input 
              type="text" 
              onChange={evt => setCompany(evt.target.value)} 
              placeholder="Şirket Adı" 
              required 
            />
          </div>
          <div className="input-group">
            <input 
              type="text" 
              onChange={evt => setTitle(evt.target.value)} 
              placeholder="Unvan" 
              required 
            />
            <input 
              type="text" 
              onChange={evt => setNumberOfEmployee(evt.target.value)} 
              placeholder="Çalışan Sayısı" 
              required 
            />
          </div>
          <div className="input-group">
            <input 
              type="text" 
              onChange={evt => setPurposeOfRequest(evt.target.value)} 
              placeholder="Talep Amacı" 
              required 
            />
          </div>
          <div className="checkbox-group">
            <div className="checkbox">
              <input type="checkbox" id="signupCheck1" />
              <label htmlFor="signupCheck1">Aydınlatma Metni uyarınca kişisel verilerimin işlenmesine rıza veriyorum.</label>
            </div>
            <div className="checkbox">
              <input type="checkbox" id="signupCheck2" />
              <label htmlFor="signupCheck2">Burada sağladığım kişisel verilerimin yurt dışına aktarılmasına açık rıza veriyorum.</label>
            </div>
          </div>
          <input 
            type='button' 
            value="HEMEN TEKLİF ALIN" 
            onClick={register} 
            className="submit-button" 
          />
        </form>
      </div>
    </section>
  );
}

export default Register;
