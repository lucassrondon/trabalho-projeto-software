import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import ShoppingList from './pages/ShoppingList';
import PurchaseHistory from './pages/PurchaseHistory';
import Header from './components/Header';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <div className="mt-16">
        <Routes>
          <Route path="/" element={<ShoppingList />} />
          <Route path="/history" element={<PurchaseHistory />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
