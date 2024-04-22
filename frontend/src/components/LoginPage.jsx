import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/login', {email, password});
            // Assuming the login endpoint returns a token upon successful login
            const token = response.data.token;
            // Set the login token in a cookie
            document.cookie = `loginToken=${token}; path=/`;
            // Redirect the user to the dashboard
            window.location.href = '/dashboard';
        } catch (error) {
            setError('Invalid email or password. Please try again.');
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-4 bg-gray-200 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Login</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2">Institute Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" required />
                </div>
                <div className='flex text-center justify-around'>
                    <button type="submit" className="w-2/5 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Login</button>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
