import React, { useState } from 'react';
import './Register.css';
import { useDispatch } from 'react-redux';
import { fetchRegister } from '../../store/future/authSlice';
import { AppDispatch } from '../../store';
import swal from 'sweetalert';
import { SubscriptionPlan, EmployeeLimitLevel } from '../../components/models/enum';
import NavBar from '../../components/molecules/NavBar';

function Register() {
  const dispatch: AppDispatch = useDispatch();
  const [isActive, setIsActive] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan>(SubscriptionPlan.MONTLY);
  const [employeeLimitLevel, setEmployeeLimitLevel] = useState<EmployeeLimitLevel>(EmployeeLimitLevel.LEVEL_1);

  const register = () => {
    if (password !== rePassword) {
      swal("Hata", "Parolalar eşleşmiyor!", "error");
      return;
    }
    const registerData = {
      firstName,
      lastName,
      password,
      rePassword,
      email,
      phone,
      companyName,
      subscriptionPlan,
      employeeLimitLevel
    };

    // Verileri konsola yaz
    console.log("Register Data: ", registerData);

    dispatch(fetchRegister(registerData)).then((action: any) => {
      if (action.payload && action.payload.code === 200) {
        swal("Başarılı!", "Kullanıcı kayıt edilmiştir!", "success")
          .then(() => setIsActive(true));
      } else if (action.payload && action.payload.status === 409) {
        swal("Hata", "Bu e-posta adresiyle zaten kayıtlı bir kullanıcı var!", "error");
      } else {
        swal("Hata", action.payload?.message || "Kayıt işlemi başarısız oldu!", "error");
      }
    }).catch(error => {
      swal("Hata", error.message || "Kayıt işlemi sırasında bir hata oluştu!", "error");
    });
  };

  return (
    <>
    <div className="row">
      <NavBar />
    </div>
    
    <section className={isActive ? "wrapper active" : "wrapper"}>
      <div className="form signup">
        <header onClick={() => setIsActive(false)}>Kayıt olun</header>
        <form action="#">
          <div className="input-group">
            <input
              type="text"
              onChange={evt => setFirstName(evt.target.value)}
              placeholder="Ad"
              required
            />
            <input
              type="text"
              onChange={evt => setLastName(evt.target.value)}
              placeholder="Soyad"
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
              onChange={evt => setCompanyName(evt.target.value)}
              placeholder="Şirket Adı"
              required
            />
          </div>
          <div className="input-group">
            <select onChange={evt => setSubscriptionPlan(evt.target.value as SubscriptionPlan)} value={subscriptionPlan}>
              <option value={SubscriptionPlan.MONTLY}>Aylık</option>
              <option value={SubscriptionPlan.ANNUALY}>Yıllık</option>
            </select>
            <select onChange={evt => setEmployeeLimitLevel(evt.target.value as EmployeeLimitLevel)} value={employeeLimitLevel}>
              <option value={EmployeeLimitLevel.LEVEL_1}>Seviye 1 (60)</option>
              <option value={EmployeeLimitLevel.LEVEL_2}>Seviye 2 (150)</option>
              <option value={EmployeeLimitLevel.LEVEL_3}>Seviye 3 (300)</option>
              <option value={EmployeeLimitLevel.LEVEL_4}>Seviye 4 (5000)</option>
            </select>
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
    </>
  );
}

export default Register;
