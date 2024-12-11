import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg fixed top-0 w-full z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <NavLink to="/" className="hover:text-blue-200">
            Supermarket App
          </NavLink>
        </h1>
        <div className="flex space-x-6">
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
        </div>
      </div>
    </nav>
  );
};

export default Header;
