import React, { useState } from 'react';

function AddItemForm({ addItem }) {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && value.trim()) {
      addItem({ name, value: parseFloat(value) });
      setName('');
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do item"
          className="p-2 border border-gray-300 rounded flex-1"
        />
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Valor"
          className="p-2 border border-gray-300 rounded flex-1"
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
