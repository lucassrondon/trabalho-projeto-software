import React, { useState } from 'react';

function AddItemForm({ addItem }) {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && value) {
      addItem({ name, value: parseFloat(value) });
      setName('');
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do item"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Valor"
          className="p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Adicionar Item
        </button>
      </div>
    </form>
  );
}

export default AddItemForm;
