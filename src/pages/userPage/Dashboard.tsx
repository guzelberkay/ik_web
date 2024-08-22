import React, { useState } from 'react';
import SideBar from '../../components/molecules/SideBar';
import UserUpdateForm from '../../components/molecules/UserUpdateForm';
import LeaveSave from '../../components/molecules/LeaveSave';
import EmployeeList from '../employeeList/EmployeeList';
import LeaveManage from '../../components/molecules/LeaveManage';
import ManageExpenses from '../../components/molecules/ManageExpenses';

function Dashboard() {
  const [activeItem, setActiveItem] = useState<string>('home');

  return (
    <div className='row'>
      <SideBar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="col" style={{ marginLeft: '280px', padding: '20px' }}>
        {activeItem === 'userupdate' && <UserUpdateForm />}
        {activeItem === 'leavesave' && <LeaveSave />}
        {activeItem === 'employeesave' && <EmployeeList />}
        {activeItem === 'leavemanage' && <LeaveManage />}
        {activeItem === 'manageexpenses' && <ManageExpenses />}
      </div>
    </div>
  );
}

export default Dashboard;