import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PurchaseHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyLoginAndFetchHistory = async () => {
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user || !user.username || !user.password) {
        localStorage.removeItem('user'); // Remove informações inválidas
        navigate('/login'); // Redireciona para login
        return;
      }

      try {
        // Verifica se o login é válido
        const loginResponse = await axios.post('http://localhost:5000/login', {
          username: user.username,
          password: user.password,
        });

        if (loginResponse.status !== 200) {
          throw new Error('Login inválido');
        }

        // Se o login for válido, busca o histórico de compras
        const historyResponse = await axios.get(`http://localhost:5000/history/${user.username}`);
        setHistory(historyResponse.data);
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar histórico ou verificar login.');
        localStorage.removeItem('user'); // Remove informações inválidas
        navigate('/login'); // Redireciona para login
      } finally {
        setLoading(false);
      }
    };

    verifyLoginAndFetchHistory();
  }, [navigate]);

  if (loading) {
    return <p className="text-center text-gray-500">Carregando histórico...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

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
              <li key={purchase.id} className="py-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">
                    Compra {index + 1}
                  </span>
                  <span className="text-sm text-gray-500">{new Date(purchase.date).toLocaleDateString('pt-BR')}</span>
                </div>
                <ul className="mt-2 pl-4 border-l-2 border-gray-300">
                  {purchase.items.map((item, idx) => (
                    <li key={idx} className="text-gray-700">
                      {item.name} - R$ {item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
                <div className="text-right text-gray-800 font-bold mt-2">
                  Total: R$ {purchase.total.toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory;
