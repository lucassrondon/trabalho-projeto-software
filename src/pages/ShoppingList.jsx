import React, { useState } from 'react';
import { saveToHistory } from '../utils/localStorage';

const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const addItem = () => {
    if (!itemName || !itemPrice) return;
    const newItem = { name: itemName, price: parseFloat(itemPrice) };
    setItems([...items, newItem]);
    setTotal(total + newItem.price);
    setItemName('');
    setItemPrice('');
  };

  const deleteItem = (index) => {
    const itemToRemove = items[index];
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    setTotal(total - itemToRemove.price);
  };

  const finalizePurchase = () => {
    if (items.length > 0) {
      const purchase = {
        date: new Date().toLocaleDateString('pt-BR'), // Adiciona a data
        items,
        total,
      };
      saveToHistory(purchase);
      setItems([]);
      setTotal(0);
      alert('Compra finalizada com sucesso!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 p-6 pt-20">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-blue-800">Lista de Compras</h1>
        <p className="text-gray-600">Gerencie suas compras de forma prática e intuitiva.</p>
      </header>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Adicionar Item</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Nome do item"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Preço"
            className="sm:w-32 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:bg-blue-500 transition"
            onClick={addItem}
          >
            Adicionar
          </button>
        </div>
      </div>

      <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Itens na Lista</h2>
        <ul className="divide-y divide-gray-200">
          {items.map((item, index) => (
            <li
              key={index}
              className="py-4 flex justify-between items-center hover:bg-gray-100 transition"
            >
              <div className="flex justify-between flex-1 pr-4">
                <span>{item.name}</span>
                <span className="text-gray-500">R$ {item.price.toFixed(2)}</span>
              </div>
              <button
                onClick={() => deleteItem(index)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold text-gray-700">Total:</span>
          <span className="text-xl font-bold text-blue-600">R$ {total.toFixed(2)}</span>
        </div>
        <button
          className="mt-6 bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-green-500 transition w-full"
          onClick={finalizePurchase}
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
};

export default ShoppingList;