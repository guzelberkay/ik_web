import React, { useState } from 'react';
import SideBar from '../../components/molecules/SideBar';
import UserUpdateForm from '../../components/molecules/UserUpdateForm';

function Dashboard() {
  const [activeItem, setActiveItem] = useState<string>('home');

  return (
    <div className='row'>
      <SideBar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="col" style={{ marginLeft: '280px', padding: '20px' }}>
        {activeItem === 'userupdate' && <UserUpdateForm />}
      </div>
    </div>
  );
}

export default Dashboard;