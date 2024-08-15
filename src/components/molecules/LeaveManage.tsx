import React from 'react'

function LeaveManage() {
  return (
    <div className="container">
        <h1>İzin İşlemleri</h1>
        <div className='row p-3' style={{maxWidth: '20%'}}>
           <select className='form-select' name="company" id="company">
             <option value="1">Firma 1</option>
             <option value="2">Firma 2</option>
             <option value="3">Firma 3</option>
           </select>
        </div>
        <div className='row p-3'>
            <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>

                <th>Ad</th>
                <th>Soyad</th>
                <th>Kalan Yıllık İzin Hakkı</th>
                <th>İzin Tipi</th>
                <th>İzin Açıklaması</th>
                <th>İzin Başlangıç Tarihi</th>
                <th>İzin Bitiş Tarihi</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fatih</td>
                <td>ER</td>
                <td>25</td>
                <td>Yıllık</td>
                <td>Tatile Gideceğim</td>
                <td>20.08.2024</td>
                <td>30.08.2024</td>
                <td>
                    <button className="btn btn-success me-2">Onayla</button>
                    <button className="btn btn-danger">Reddet</button>
                </td>
              </tr>
            </tbody>
            </table>
        </div>
    </div>
  )
}

export default LeaveManage