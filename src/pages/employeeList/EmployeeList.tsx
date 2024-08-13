import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, updateEmployee, addEmployee, deleteEmployee, Employee } from '../../store/future/employeeSlice';
import { RootState, AppDispatch } from '../../store';
import './EmployeeList.css';

/* function convertDateToEpoch(date: Date, inMilliseconds: boolean = false): number {
  if (inMilliseconds) {
      return date.getTime();
  } else {
      return Math.floor(date.getTime() / 1000);
  }
} */

function epochToCustomDate(epochTime: number): string {
  // Epoch zamanını milisaniyeye dönüştürerek Date nesnesi oluşturun
  const date = new Date(epochTime * 1000);

  // Gün, Ay ve Yıl değerlerini alın
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Ay değeri 0'dan başladığı için 1 ekliyoruz
  const year = date.getUTCFullYear();

  // İstenen formatta birleştirin
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
    annualLeave: 0,
    active: false,
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmployeeForm({
      ...employeeForm,
      [name]: name === 'active' ? value === 'true' : value,
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const convertedEmployeeForm = {
      ...employeeForm,
      hireDate: convertDateToEpoch(new Date(employeeForm.hireDate), true),
      birthDate: convertDateToEpoch(new Date(employeeForm.birthDate), true),
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
        annualLeave: 0,
        active: false,
      });
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
        <input
          type="text"
          name="userid"
          placeholder="Kullanıcı ID"
          value={employeeForm.user}
          onChange={handleInputChange}
          required
          className="readonly-input"
        />
        <input
          type="text"
          name="firstName"
          placeholder="Ad"
          value={employeeForm.firstName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Soyad"
          value={employeeForm.lastName}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={employeeForm.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Şifre"
          value={employeeForm.password}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="hireDate"
          placeholder="İşe Başlama Tarihi"
          value={employeeForm.hireDate}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="birthDate"
          placeholder="Doğum Tarihi"
          value={employeeForm.birthDate}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="annualLeave"
          placeholder="Yıllık İzin"
          value={employeeForm.annualLeave}
          onChange={handleInputChange}
        />
        <select
          name="active"
          value={employeeForm.active ? 'true' : 'false'}
          onChange={handleInputChange}
        >
          <option value="true">Aktif</option>
          <option value="false">Pasif</option>
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
              <td>{epochToCustomDate(employee.hireDate)}</td>
              <td>{epochToCustomDate(employee.birthDate)}</td>
              <td>{employee.annualLeave}</td>
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
