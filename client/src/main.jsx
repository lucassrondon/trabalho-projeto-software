import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import Login from './pages/Login';
import Register from './pages/Register';
import ShoppingList from './pages/ShoppingList';
import PurchaseHistory from './pages/PurchaseHistory';
import Header from './components/Header';

function App() {
  const location = useLocation();

  // Defina as rotas onde o Header não deve aparecer
  const excludeHeaderRoutes = ['/login', '/register'];
  const showHeader = !excludeHeaderRoutes.includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}
      <div className={`mt-16 ${!showHeader && 'mt-0'}`}>
        <Routes>
          <Route path="/" element={<ShoppingList />} />
          <Route path="/history" element={<PurchaseHistory />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
