import React, { useState } from 'react'
import SidebarForEmployee from '../../components/molecules/SideBarForEmployee'
import ExpenseSave from '../../components/molecules/ExpenseSave';
import MyExpenses from '../../components/molecules/MyExpenses';
import MyShifts from '../../components/molecules/MyShifts';
import LeaveRequest from '../../components/molecules/LeaveRequest';
import AssetManagement from '../assetManagement/AssetManagement';

function EmployeeMainPage() {
    const [activeItem, setActiveItem] = useState<string>('home');
  return (
    <>
    <SidebarForEmployee activeItem={activeItem} setActiveItem={setActiveItem} />
    <div className="col" style={{ marginLeft: '280px', padding: '20px' }}>
        {activeItem === 'expenseSave' && <ExpenseSave />}
        {activeItem === 'myexpenses' && <MyExpenses />}
        {activeItem === 'myshifts' && <MyShifts />}
        {activeItem === 'leaveRequest' && <LeaveRequest />}
        {activeItem === 'manageAssets' && <AssetManagement />}

    </div>
    </>
  )
}

export default EmployeeMainPage