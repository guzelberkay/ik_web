import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetPendingUsers, IUserProfile, updatePendingUserStatus, ISearchUser } from '../../store/future/userSlice';
import { RootState, useAppSelector, AppDispatch} from '../../store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PendingUsers.css';
// Mock data
const mockPendingUsers: ISearchUser[] = [
    {
        id: 1,
        email: 'jane.doe@example.com',
        name: 'Jane Doe',
        company: 'Example Corp',
        title: 'Software Engineer',
        avatar: 'https://via.placeholder.com/50',
        status: 'pending',
        phone: '055544433322',
        numberOfEmployee: 0
    },
    {
        id: 2,
        email: 'john.smith@example.com',
        name: 'John Smith',
        company: 'Acme Inc',
        title: 'Project Manager',
        avatar: 'https://via.placeholder.com/50',
        status: 'pending',
        phone: '055544433322',
        numberOfEmployee: 0
    },
    {
        id: 3,
        email: 'alice.johnson@example.com',
        name: 'Alice Johnson',
        company: 'Tech Solutions',
        title: 'UX Designer',
        avatar: 'https://via.placeholder.com/50',
        status: 'pending',
        phone: '055544433322',
        numberOfEmployee: 0
    }
];

const PendingUsers = () => {
    const dispatch: AppDispatch = useDispatch();
    const token = useAppSelector(state => state.auth.token);     
    const pendingUsers = useSelector((state: RootState) => state.user.userSearchList);
    const userProfile: IUserProfile | null = useAppSelector(state=> state.user.userProfile);

    useEffect(() => {
        dispatch(fetchGetPendingUsers(token));
    }, [dispatch, token]);

    // For testing purpose, use mock data
    useEffect(() => {
        dispatch({
            type: 'user/fetchGetPendingUsers/fulfilled',
            payload: { code: 200, data: mockPendingUsers }
        });
    }, [dispatch]);

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
                        <th scope="col">Avatar</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Company</th>
                        <th scope="col">Title</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Number of Employees</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pendingUsers.map(user => (
                        <tr key={user.id}>
                            <td><img src={user.avatar} alt="Avatar" className="img-fluid" style={{ width: '50px', borderRadius: '50%' }} /></td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.company}</td>
                            <td>{user.title}</td>
                            <td>{user.phone}</td>
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