import React, { useEffect, useState } from 'react'
import { AppDispatch, useAppSelector } from '../../store';
import { fetchCompanies, ICompany } from '../../store/future/companySlice';
import { useDispatch } from 'react-redux';
import { fetchGetPendingLeaves, fetchUpdateLeaveStatus, IPendingLeaves, IUpdateLeave } from '../../store/future/leaveSlice';
import {epochToDate, dateToEpoch} from '../../util/dateFormatter'
import swal from 'sweetalert';

function LeaveManage() {
  const dispatch: AppDispatch = useDispatch();
  const [selectedCompany, setSelectedCompany] = useState<number>(0);
  const companyList: ICompany[] = useAppSelector(state => state.company.companies) || [];
  const pendingLeaves: IPendingLeaves[] = useAppSelector(state => state.leave.pendingLeaves) || [];



  useEffect(() => {
    dispatch(fetchCompanies())
}, [dispatch]);

  useEffect(() => {
    if(selectedCompany>0){
      dispatch(fetchGetPendingLeaves(selectedCompany))
    }
  }, [dispatch, selectedCompany]);

  const approveLeave = (leaveId: number) => {
    const leave:IUpdateLeave = { leaveId, isApproved: true }
    dispatch(fetchUpdateLeaveStatus(leave)).then((data: any) => {
      if (data.payload && data.payload.code === 200) {
        swal("İzin onaylandı", "İzin onaylandı", "success");
        dispatch(fetchGetPendingLeaves(selectedCompany))
      }
    });
  };

  const declineLeave = (leaveId: number) => {
    const leave:IUpdateLeave = { leaveId, isApproved: false }
    dispatch(fetchUpdateLeaveStatus(leave)).then((data: any) => {
      if (data.payload && data.payload.code === 200) {
        swal("İzin reddedildi", "İzin reddedildi", "error");
        dispatch(fetchGetPendingLeaves(selectedCompany))
      }
    })
  };  
  return (
    <div className="container">
        <h1>İzin İşlemleri</h1>
        <div className='row p-3' style={{maxWidth: '20%'}}>
              <select
                className='form-select'
                    id="company"
                    value={selectedCompany}
                    style={{minWidth: '200px'}}
                    onChange={(e) => setSelectedCompany(Number(e.target.value))}
                >
                    <option value="">Şirket Seç</option>
                    {
                        companyList.length > 0 && companyList.map((company, index) => <option key={index} value={company.companyId}>{company.companyName}</option>)
                    }
                    
              </select>
        </div>
        <div className='row p-3'>
            <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>

                <th>Ad</th>
                <th>Soyad</th>
                <th>İzin Tipi</th>
                <th>İzin Açıklaması</th>
                <th>İzin Başlangıç Tarihi</th>
                <th>İzin Bitiş Tarihi</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {
                pendingLeaves.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.employeeName}</td>
                      <td>{item.employeeSurname}</td>
                      <td>{item.leaveType}</td>
                      <td>{item.description}</td>
                      <td>{epochToDate(item.startDate)}</td>
                      <td>{epochToDate(item.endDate)}</td>
                      <td>
                        <button className="btn btn-success me-2" onClick={() => approveLeave(item.leaveId)}>Onayla</button>
                        <button className="btn btn-danger" onClick={() => declineLeave(item.leaveId)} >Reddet</button>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
            </table>
        </div>
    </div>
  )
}

export default LeaveManage

