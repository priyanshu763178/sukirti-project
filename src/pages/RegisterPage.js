import  { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css'

const RegisterPage = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const res = await axios.post('http://localhost:5000/api/register', form);
    //         localStorage.setItem('token', res.data.token);
    //         navigate('/home');
    //     } catch (err) {
    //         alert(err.response.data.message || 'Registration failed');
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/register', form);
            localStorage.setItem('token', res.data.token);
            navigate('/home');
        } catch (err) {
            if (err.response && err.response.data) {
                alert(err.response.data.message || 'Registration failed');
            } else {
                alert('Registration failed. Please try again.');
            }
        }
    };
    
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/">Login</Link></p>
        </div>
    );
};

export default RegisterPage;
