import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/login', {email, password});
            const {success, token, user} = response.data;
            console.log(response.data);
            if (success) {
                if (user.access === "none") {
                    setError('You are not authorized to access this page. Please contact the administrator.');
                    console.error('Error logging in:');
                } else {
                    // Store the JWT token in local storage
                    localStorage.setItem('loginToken', token);
                    // Redirect to the dashboard
                    navigate('/dashboard');
                }
            } else {
                setError('Invalid email or password. Please try again.');
            }
        } catch (error) {
            // Check if error.response exists and contains an error code
            if (error.response) {
                // Display error message based on status code
                if (error.response.status === 401) {
                    setError('Invalid email or password. Please try again.');
                } else {
                    setError('An unexpected error occurred. Please try again later.');
                }
            } else {
                // Display generic error message for network errors
                setError('Error logging in. Please try again.');
            }
            console.error('Error logging in:', error);
        }
    };


    return (
        <div className="flex flex-col justify-center items-center relative h-screen">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-4 bg-gray-200 rounded-lg relative z-10">
                <h2 className="text-xl font-semibold mb-4">Login</h2>
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
            {error && (
                <div className="absolute top-0 left-0 w-full px-4 py-2 bg-red-500 text-white text-center z-20">
                    {error}
                </div>
            )}
        </div>

    );
}

export default LoginPage;   