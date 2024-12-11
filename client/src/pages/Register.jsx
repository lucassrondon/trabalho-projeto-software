import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', {
                username,
                password,
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Erro no cadastro');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold mb-4 text-center">Cadastro</h1>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full mb-4 p-2 border rounded"
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mb-4 p-2 border rounded"
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                    >
                        Registrar
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
                <p className="mt-4 text-center">
                    Já tem uma conta?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Faça login aqui
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
