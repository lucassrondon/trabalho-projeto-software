import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import AddItemForm from './AddItemForm';
import PurchaseHistory from './PurchaseHistory';

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  // Carregar compras e histórico do localStorage
  useEffect(() => {
    const storedShoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    const storedPurchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
    setShoppingList(storedShoppingList);
    setPurchaseHistory(storedPurchaseHistory);
  }, []);

  // Adicionar item à lista de compras
  const addItem = (item) => {
    const updatedList = [...shoppingList, item];
    setShoppingList(updatedList);
    localStorage.setItem('shoppingList', JSON.stringify(updatedList));
  };

  // Finalizar a compra e adicionar ao histórico
  const finishPurchase = () => {
    const total = shoppingList.reduce((sum, item) => sum + item.value, 0);
    const newPurchase = {
      id: Date.now(),
      items: shoppingList,
      total,
      date: new Date().toLocaleDateString(),
    };

    const updatedHistory = [...purchaseHistory, newPurchase];
    setPurchaseHistory(updatedHistory);
    localStorage.setItem('purchaseHistory', JSON.stringify(updatedHistory));

    setShoppingList([]); // Limpa a lista após a compra
    localStorage.setItem('shoppingList', JSON.stringify([])); // Limpa o localStorage
  };

  // Deletar uma compra do histórico
  const deletePurchase = (purchaseId) => {
    const updatedHistory = purchaseHistory.filter(purchase => purchase.id !== purchaseId);
    setPurchaseHistory(updatedHistory);
    localStorage.setItem('purchaseHistory', JSON.stringify(updatedHistory));
  };

  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="flex justify-between">
          <Link to="/" className="text-blue-500">Lista de Compras</Link>
          <Link to="/history" className="text-blue-500">Histórico de Compras</Link>
        </nav>

        <Routes>
          <Route path="/" element={
            <div>
              <h1 className="text-xl font-bold mb-4">Lista de Compras</h1>
              <AddItemForm addItem={addItem} />
              <ul className="list-none mt-4">
                {shoppingList.map((item, index) => (
                  <li key={index} className="flex justify-between py-2 border-b">
                    <span>{item.name} - R${item.value.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={finishPurchase}
                className="mt-4 bg-green-500 text-white p-2 rounded"
              >
                Finalizar Compra
              </button>
            </div>
          } />
          <Route path="/history" element={
            <PurchaseHistory 
              history={purchaseHistory}
              deletePurchase={deletePurchase}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
