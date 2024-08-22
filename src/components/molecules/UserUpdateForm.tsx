import React , {useState} from 'react'
import { useDispatch } from 'react-redux';
import { RootState, useAppSelector, AppDispatch } from '../../store';
import { fetchUpdateProfile } from '../../store/future/userSlice';
import swal from 'sweetalert';

function UserUpdateForm() {
    const [avatar, setavatar] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const token = useAppSelector(state => state.auth.token) || localStorage.getItem('token') || '';
    const dispatch: AppDispatch = useDispatch();
    const isLogin = useAppSelector(state => state.auth.isAuth);
    const role = useAppSelector(state => state.auth.user?.role);

    const updateUser = ()=>{
        
        dispatch(fetchUpdateProfile({
            token,avatar,firstName,lastName
        })).then(data=>{
          if(data.payload.code===200){
            
            swal({
                title: "Kayıt Başarılı",
                text: data.payload.message,
                icon: "success"
              }).then(() => {
                console.log(localStorage.getItem('token'))
                
                console.log(isLogin,role)
              });
        }else{
          swal({
            title: "Hata",
            text: "Bir hata oluştu",
            icon: "error"
          });
        }
        })
    
    }
  return (
    <div className="p-3">
      <h4 className='text-white'>Kullanıcı Güncelle</h4>
      <form>
        <div className="mb-3">
          <label htmlFor="avatar" className="form-label text-white" >avatar</label>
          <input type="text" className="form-control" id="username" onChange={evt => setavatar(evt.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label text-white" >Ad</label>
          <input type="text" className="form-control" id="email" onChange={evt => setfirstName(evt.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label text-white">Soyad</label>
          <input type="text" className="form-control" id="password" onChange={evt => setlastName(evt.target.value)} />
        </div>
        
          <button type="submit" className="btn btn-success" onClick={() => { updateUser()}}>Kaydet</button>
      
      </form>
      
    </div>
  );
}

export default UserUpdateForm;
