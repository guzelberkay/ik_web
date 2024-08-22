import React, { useEffect, useState } from 'react'
import { AppDispatch, useAppSelector } from '../../store';
import { useDispatch } from 'react-redux';
import { fetchCompanies, ICompany } from '../../store/future/companySlice';
import { fetchEmployeesForLeave } from '../../store/future/employeeSlice';
import { fetchSaveComment } from '../../store/future/commentSlice';
import swal from 'sweetalert';

function SaveComment() {

    const dispatch: AppDispatch = useDispatch();
    const [content, setcontent] = useState('');
    const [selectedCompany, setSelectedCompany] = useState<number>(0);

    const userId = localStorage.getItem('userId');
    const companyList: ICompany[] = useAppSelector(state => state.company.companies) || [];
    const token = useAppSelector(state => state.auth.token) || localStorage.getItem('token') || '';

    useEffect(() => {
        dispatch(fetchCompanies())
    }, [dispatch]);

    useEffect(() => {
        if(selectedCompany>0){
            dispatch(fetchEmployeesForLeave(selectedCompany))
        }
    }, [dispatch, selectedCompany]);
       
    const handleSaveComment = () => {
        
        dispatch(fetchSaveComment({token: token , content: content, companyId: selectedCompany})).then((data) => {
            if(data.payload.code === 200){
                swal("Basarılı", data.payload.message, "success").then(() => {
                    setSelectedCompany(0);
                    
                });
            } else {
                swal("Hata", data.payload.message, "error");
            }
           

        });
    };

       

  return (
     <div className='container p-5 m-5'>
        <select
                className='form-select mb-2'
                    id="company"
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(Number(e.target.value))}
                >
                    <option value="">Şirket Seç</option>
                    {
                        companyList.length > 0 && companyList.map((company, index) => <option key={index} value={company.companyId}>{company.companyName}</option>)
                    }
                    
                </select>
         <div className='row '>
         <div className="form-group mb-5 ">
         <label className='' >Yorum:</label>
         <textarea className="form-control mb-5" onChange={(e) => setcontent(e.target.value)} id="comment"></textarea>
         </div>
         <div className='row'>
         <button className='btn btn-success ms-3' onClick={handleSaveComment}>
            Kaydet
         </button>
         </div>
     </div>

         
         

    </div>
  )
}

export default SaveComment
