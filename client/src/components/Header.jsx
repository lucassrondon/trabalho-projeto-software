import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  // Obtém o nome do usuário logado do localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove o usuário do localStorage
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg fixed top-0 w-full z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <NavLink to="/" className="hover:text-blue-200">
            Supermarket App
          </NavLink>
        </h1>
        <div className="flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-200 font-semibold'
                : 'hover:text-blue-300 transition'
            }
          >
            Lista de Compras
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-200 font-semibold'
                : 'hover:text-blue-300 transition'
            }
          >
            Histórico
          </NavLink>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-blue-100 font-semibold">
                Olá, {user.username}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded transition"
              >
                Sair
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded transition"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
