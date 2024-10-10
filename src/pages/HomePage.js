import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../redux/userSlice';
import { useNavigate, Link } from 'react-router-dom'; 
import './HomePage.css';

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { users, status, error } = useSelector((state) => state.users);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/');
        } else {
            dispatch(fetchUsers(token));
        }
    }, [dispatch, token, navigate]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await dispatch(deleteUser({ id, token }));
                localStorage.removeItem('token');
                navigate('/'); 
            } catch (error) {
                console.error("Delete failed: ", error);
            }
        }
    };

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (status === 'failed') {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Home Page</h2>
            <button onClick={() => { localStorage.removeItem('token'); navigate('/'); }}>Logout</button>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Link to={`/edit/${user._id}`} className="edit-button">Edit</Link>
                                <button onClick={() => handleDelete(user._id)} className="delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HomePage;
