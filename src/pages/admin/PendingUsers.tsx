import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetPendingUsers, updatePendingUserStatus, IPendingUsers } from '../../store/future/userSlice';
import { RootState, useAppSelector, AppDispatch } from '../../store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PendingUsers.css';

const PendingUsers = () => {
  const dispatch: AppDispatch = useDispatch();
  const pendingUsers = useAppSelector(state => state.user.pendingUsers);
  const token = useAppSelector(state => state.auth.token) || localStorage.getItem('token') || '';
 

  useEffect(() => {
    if (token) {
      console.log('Fetching pending users with token:', token);
      dispatch(fetchGetPendingUsers(token));
    } else {
      console.log('No token available');
    }
  }, [dispatch, token]);

  useEffect(() => {
    console.log("Pending Users Updated:", pendingUsers);
  }, [pendingUsers]);

  const handleApprove = (userId: number) => {
    dispatch(updatePendingUserStatus({ userId, status: 'approved', token }))
      .then(() => {
        toast.success('User approved successfully!');
      })
      .catch(() => {
        toast.error('Failed to approve user.');
      });
  };

  const handleReject = (userId: number) => {
    dispatch(updatePendingUserStatus({ userId, status: 'rejected', token }))
      .then(() => {
        toast.success('User rejected successfully!');
      })
      .catch(() => {
        toast.error('Failed to reject user.');
      });
  };

  return (
    <div className="container">
      <ToastContainer />
      <h1>Pending Users</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">User Status</th>
            <th scope="col">Company ID</th>
            <th scope="col">Company Name</th>
            <th scope="col">Number of Employees</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingUsers.map((user: IPendingUsers) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.userStatus}</td>
              <td>{user.companyId}</td>
              <td>{user.companyName}</td>
              <td>{user.numberOfEmployee}</td>
              <td>
                <button className="btn btn-success btn-sm mx-1" onClick={() => handleApprove(user.id)}>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button className="btn btn-danger btn-sm mx-1" onClick={() => handleReject(user.id)}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingUsers;
