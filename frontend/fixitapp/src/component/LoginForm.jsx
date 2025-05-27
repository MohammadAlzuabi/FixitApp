import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('https://localhost:44300/api/user/login', {
                email: email,
                password: password
            });
            localStorage.setItem('user', JSON.stringify(response.data));
            onLogin(response.data);
            navigate('/home');
        } catch (err) {
            setError('Fel e-post eller lösenord');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Logga in</h2>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-post" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Lösenord" required />
            <button type="submit" disabled={loading}>{loading ? 'Loggar in...' : 'Logga in'}</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default LoginForm;
