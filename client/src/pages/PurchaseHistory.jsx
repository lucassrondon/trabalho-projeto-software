import React, { useEffect, useState } from 'react';
import { getHistory } from '../utils/localStorage';

const PurchaseHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 p-6 pt-20">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Histórico de Compras</h1>
        <p className="text-gray-600">Revise suas compras anteriores.</p>
      </header>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700">Compras Finalizadas</h2>
        {history.length === 0 ? (
          <p className="text-gray-500 mt-4">Nenhuma compra finalizada ainda.</p>
        ) : (
          <ul className="divide-y divide-gray-200 mt-4">
            {history.map((purchase, index) => (
              <li key={index} className="py-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">
                    Compra {index + 1}
                  </span>
                  <span className="text-sm text-gray-500">{purchase.date}</span>
                </div>
                <ul className="mt-2 pl-4 border-l-2 border-gray-300">
                  {purchase.items.map((item, idx) => (
                    <li key={idx} className="text-gray-700">
                      {item.name} - R$ {item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory;
