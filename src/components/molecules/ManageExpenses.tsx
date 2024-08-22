import React, { useEffect } from 'react'
import { fetchPendingExpenses, fetchUpdateExpense, IPendingExpenses, IUpdateExpense } from '../../store/future/expenseSlice'
import { AppDispatch, useAppSelector } from '../../store'
import { fetchCompanies, ICompany } from '../../store/future/companySlice'
import { epochToDate } from '../../util/dateFormatter'
import { useDispatch } from 'react-redux'
import { IResponse } from '../models/IResponse'
import swal from 'sweetalert';

function ManageExpenses() {

  const pendingExpenses : IPendingExpenses [] = useAppSelector(state => state.expense.pendingExpenses)
  const [selectedCompany, setSelectedCompany] = React.useState(0)
  const companyList : ICompany[] = useAppSelector(state => state.company.companies)
  const dispatch : AppDispatch = useDispatch()
  const [selectedexpenseId, setSelectedExpenseId] = React.useState(0);


  useEffect(() => {
    dispatch(fetchCompanies())
  },[])

  useEffect(() => {
    if(selectedCompany > 0){
      dispatch(fetchPendingExpenses(selectedCompany))
    } else {
      setSelectedExpenseId(0); //reducer da yazılacak
    }
  },[dispatch, selectedCompany])

  const approveExpense = (expenseId: number) => {
    const expense:IUpdateExpense = { expenseId, isApproved: true }
    dispatch(fetchUpdateExpense(expense)).then((data: any) => {
      if (data.payload && data.payload.code === 200) {
        swal("Harcama onaylandı", "Harcama onaylandı", "success");
        dispatch(fetchPendingExpenses(selectedCompany))
      }
    });
  };
  
  const declineExpense = (expenseId: number) => {
    const expense:IUpdateExpense = { expenseId, isApproved: true }
    dispatch(fetchUpdateExpense(expense)).then((data: any) => {
      if (data.payload && data.payload.code === 200) {
        swal("Harcama reddedildi", "Harcama reddedildi", "error");
        dispatch(fetchPendingExpenses(selectedCompany))
      }
    });
  };
 


  return (
   <div className="container">
    <h1>Harcamaları Yönet</h1>
      <select
        className='form-select'
            id="company"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(Number(e.target.value))}
        >
            <option value={0}>Şirket Seç</option>
            {
                companyList.length > 0 && companyList.map((company, index) => <option key={index} value={company.companyId}>{company.companyName}</option>)
            }
            
      </select>
    <div className='row p-3'>
    <table className='table table-striped table-hover table-bordered'>
        <thead>
          <tr>
            <th>Ad</th>
            <th>Soyad</th>
            <th>Harcama Miktarı</th>
            <th>Harcama Tarihi</th>
            <th>Harcama Açıklaması</th>
            <th>Harcama Durumu</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
            {
                pendingExpenses.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.amount}</td>
                      <td>{epochToDate(item.expenseDate)}</td>
                      <td>{item.description}</td>
                      <td>{item.expenseStatus}</td>
                      <td>
                        <button className='btn btn-success me-2' onClick={() => approveExpense(item.expenseId)} >Onayla</button>
                        <button className='btn btn-danger' onClick={() => declineExpense(item.expenseId)} >Reddet</button>
                      </td>
                    </tr>
                  )
                })
            }
        </tbody>
    </table>
    </div>
   </div>
  )
}

export default ManageExpenses