import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, updateEmployee, addEmployee, deleteEmployee, Employee, fetchEmployeesByCompanyManagerId } from '../../store/future/employeeSlice';
import { RootState, AppDispatch } from '../../store';
import { ICompany, fetchCompanies } from '../../store/future/companySlice';
import {dateToEpoch} from '../../util/dateFormatter';
import './EmployeeList.css';

function formatTimestamp(timestamp: number): string {
  console.log('timestamp: ', timestamp);
  // Zaman damgasını milisaniyeye çevirin
  const date = new Date(timestamp * 1000);

  // Gün, ay ve yıl bilgilerini alın
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Ay değeri 0'dan başladığı için 1 ekliyoruz
  const year = date.getUTCFullYear();

  // gg-aa-yyyy formatında birleştirin
  return `${day}-${month}-${year}`;
}

function convertDateToEpoch(date: Date, inMilliseconds: boolean = false): number {
  // Tarihi gg-aa-yyyy formatında almak için getDate(), getMonth() ve getFullYear() kullanırız.
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Ay indeksi 0'dan başlar, bu yüzden +1 yaparız.
  const year = date.getFullYear();

  // gg-aa-yyyy formatını oluşturur.
  const formattedDate = `${day}-${month}-${year}`;

  // Epoch time'ı milisaniye veya saniye olarak döndürür.
  if (inMilliseconds) {
    return date.getTime();
  } else {
    return Math.floor(date.getTime() / 1000);
  }
  
}
function epochToCustomDate(epochTimeInMilliseconds: number): string {
  console.log('epochTimeInMilliseconds: ', epochTimeInMilliseconds);
  // Zaman damgasından Date nesnesi oluşturma
  const date = new Date(epochTimeInMilliseconds);

  // Gün, ay ve yıl bilgilerini alalım
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Ay değeri 0'dan başladığı için 1 ekliyoruz
  const year = date.getUTCFullYear().toString().slice(-2); // Yılın son iki hanesini alıyoruz

  // gg-aa-yy formatında birleştirin
  return `${day}-${month}-${year}`;
}


const EmployeeList = () => {
  const dispatch: AppDispatch = useDispatch();
  const employees = useSelector((state: RootState) => state.employee.employees);
  const [employeeForm, setEmployeeForm] = useState<Employee>({
    user: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    hireDate: 0,
    birthDate: 0,
    company: 0,
    annualLeave: 0,
    active: false,
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<number>(0);
  const companies = useSelector((state: RootState) => state.company.companies);

  const companyManagerIdString = localStorage.getItem('userId');
  const companyManagerId = companyManagerIdString ? parseInt(companyManagerIdString) : null;
  const [hireDateString, setHireDateString] = useState<string>('');
  const [birthDateString, setBirthDateString] = useState<string>('');

  useEffect(() => {
    if (companyManagerId !== null) {
      console.log('Dispatched companyManagerId:', companyManagerId);
      dispatch(fetchEmployeesByCompanyManagerId(companyManagerId));
    }
  }, [dispatch, companyManagerId]);

  useEffect(() => {
    dispatch(fetchCompanies())
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmployeeForm({
      ...employeeForm,
      [name]: name === 'active' ? value === 'true' : value,
    });
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompany(Number(e.target.value));
    setEmployeeForm({
      ...employeeForm,
      company: Number(e.target.value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const convertedEmployeeForm = {
      ...employeeForm,
      hireDate: dateToEpoch(hireDateString),
      birthDate: dateToEpoch(birthDateString),
      company: selectedCompany,
    };

    try {
      if (isUpdating) {
        await dispatch(updateEmployee(convertedEmployeeForm)).unwrap();
      } else {
        await dispatch(addEmployee(convertedEmployeeForm)).unwrap();
      }
      setEmployeeForm({
        user: 0,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        hireDate: 0,
        birthDate: 0,
        company: 0,
        annualLeave: 0,
        active: false,
      });
      setSelectedCompany(0);
      setIsUpdating(false);
      dispatch(fetchEmployees());
    } catch (err) {
      console.error('Failed to add or update employee:', err);
    }
  };

  const handleEdit = (employee: Employee) => {
    setEmployeeForm(employee);
    setIsUpdating(true);
  };

  const handleDeleteEmployee = (employeeId: number) => {
    dispatch(deleteEmployee(employeeId)).unwrap()
      .then(() => {
        dispatch(fetchEmployees());
      })
      .catch((err) => {
        console.error('Failed to delete employee:', err);
      });
  };


return (
    <div className="employee-list">
      <h2>Çalışan Listesi</h2>

      <form onSubmit={handleSubmit} className="employee-form">
        <label htmlFor="userid">Kullanıcı ID</label>
        <input
          type="text"
          name="user"
          id="userid"
          placeholder="Kullanıcı ID"
          value={employeeForm.user}
          onChange={handleInputChange}
          required
          className="readonly-input"
        />
        <label htmlFor="firstName">Ad</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Ad"
          value={employeeForm.firstName}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="lastName">Soyad</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Soyad"
          value={employeeForm.lastName}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={employeeForm.email}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="password">Şifre</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Şifre"
          value={employeeForm.password}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="hireDate">İşe Başlama Tarihi</label>
        <input
          type="date"
          name="hireDate"
          id="hireDate"
          placeholder="İşe Başlama Tarihi"
          value={hireDateString}
          onChange={(e) => setHireDateString(e.target.value)}
        />
        <label htmlFor="birthDate">Doğum Tarihi</label>
        <input
          type="date"
          name="birthDate"
          id="birthDate"
          placeholder="Doğum Tarihi"
          value={birthDateString}
          onChange={(e) => setBirthDateString(e.target.value)}
        />
        <label htmlFor="annualLeave">Yıllık İzin</label>
        <input
          type="number"
          name="annualLeave"
          id="annualLeave"
          placeholder="Yıllık İzin"
          value={employeeForm.annualLeave}
          onChange={handleInputChange}
        />
        <label htmlFor="active">Durum</label>
        <select
          name="active"
          id="active"
          value={employeeForm.active ? 'true' : 'false'}
          onChange={handleInputChange}
        >
          <option value="true">Aktif</option>
          <option value="false">Pasif</option>
        </select>

        <label htmlFor="company">Şirket</label>
        <select
          id="company"
          value={selectedCompany}
          onChange={handleCompanyChange}
          required
        >
          <option value="">Şirket Seç</option>
          {companies.map((company) => (
            <option key={company.companyId} value={company.companyId}>
              {company.companyName}
            </option>
          ))}
        </select>

        <button type="submit">{isUpdating ? 'Güncelle' : 'Ekle'}</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Kullanıcı ID</th>
            <th>Ad</th>
            <th>Soyad</th>
            <th>Email</th>
            <th>İşe Başlama Tarihi</th>
            <th>Doğum Tarihi</th>
            <th>Yıllık İzin</th>
            <th>Company ID</th>
            <th>Durum</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.user}>
              <td>{employee.user}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{formatTimestamp(employee.hireDate)}</td>
              <td>{formatTimestamp(employee.birthDate)}</td>
              <td>{employee.annualLeave}</td>
              <td>{employee.company}</td>
              <td>{employee.active ? 'Aktif' : 'Pasif'}</td>
              <td>
                <button onClick={() => handleEdit(employee)}>Düzenle</button>
                <button onClick={() => handleDeleteEmployee(employee.user)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
