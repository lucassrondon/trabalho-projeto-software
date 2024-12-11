export const saveToHistory = (purchase) => {
  const history = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
  localStorage.setItem('purchaseHistory', JSON.stringify([...history, purchase]));
};

export const getHistory = () => {
  return JSON.parse(localStorage.getItem('purchaseHistory')) || [];
};
